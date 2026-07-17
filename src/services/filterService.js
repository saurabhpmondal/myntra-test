/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Filter Service
 * Version : V1.2
 * =====================================================
 */

import { DataStore } from "./dataService.js";
import { LookupStore } from "./lookupService.js";
import { getLatestPeriod, getPeriodKey } from "./periodService.js";

export const FilterState = {

    period: null,

    brand: "All",

    category: "All",

    erpStatus: "All",

    search: ""

};

/**
 * Initialize filters only once
 */
export function initializeFilters() {

    if (FilterState.period !== null) {

        return;

    }

    const latest = getLatestPeriod(DataStore.sales);

    if (latest) {

        FilterState.period = latest.key;

    }

}

/**
 * Update filter state
 */
export function updateFilters(filters = {}) {

    Object.assign(FilterState, filters);

}

/**
 * Reset filters
 */
export function resetFilters() {

    const latest = getLatestPeriod(DataStore.sales);

    FilterState.period = latest ? latest.key : null;

    FilterState.brand = "All";

    FilterState.category = "All";

    FilterState.erpStatus = "All";

    FilterState.search = "";

}

/**
 * Common filter logic
 */
function matchesFilters(sale, product, period) {

    if (!product) return false;

    if (period !== null) {

        const salePeriod = getPeriodKey(
            sale.month,
            sale.year
        );

        if (salePeriod !== period) {

            return false;

        }

    }

    if (
        FilterState.brand !== "All" &&
        product.brand !== FilterState.brand
    ) {

        return false;

    }

    if (
        FilterState.category !== "All" &&
        product.category !== FilterState.category
    ) {

        return false;

    }

    if (
        FilterState.erpStatus !== "All" &&
        product.erpStatus !== FilterState.erpStatus
    ) {

        return false;

    }

    if (FilterState.search.trim()) {

        const keyword = FilterState.search
            .trim()
            .toLowerCase();

        const matched =

            String(sale.style_id || "")
                .toLowerCase()
                .includes(keyword)

            ||

            String(product.erpSku || "")
                .toLowerCase()
                .includes(keyword);

        if (!matched) {

            return false;

        }

    }

    return true;

}

/**
 * Current period sales
 */
export function getFilteredSales() {

    return getSalesByPeriod(FilterState.period);

}

/**
 * Any period sales
 */
export function getSalesByPeriod(period) {

    return DataStore.sales.filter(sale => {

        const product =
            LookupStore.productMap[sale.style_id];

        return matchesFilters(
            sale,
            product,
            period
        );

    });

}

/**
 * ==========================================
 * Sales for Trend Charts
 * Applies all filters except Period
 * ==========================================
 */

export function getTrendSales(){

    return DataStore.sales.filter(sale=>{

        const product =
            LookupStore.productMap[sale.style_id];

        if(!product){

            return false;

        }

        // Brand

        if(

            FilterState.brand !== "All" &&

            product.brand !== FilterState.brand

        ){

            return false;

        }

        // Category

        if(

            FilterState.category !== "All" &&

            product.category !== FilterState.category

        ){

            return false;

        }

        // ERP Status

        if(

            FilterState.erpStatus !== "All" &&

            product.erpStatus !== FilterState.erpStatus

        ){

            return false;

        }

        // Search

        if(FilterState.search.trim()){

            const keyword =

                FilterState.search

                    .trim()

                    .toLowerCase();

            const matched =

                String(sale.style_id || "")

                    .toLowerCase()

                    .includes(keyword)

                ||

                String(product.erpSku || "")

                    .toLowerCase()

                    .includes(keyword);

            if(!matched){

                return false;

            }

        }

        return true;

    });

}