/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index Service
 * Version : V2.0
 * =====================================================
 */

import { buildDemandIndex } from "./demandIndexBuilder.js";

import { DemandIndexStore } from "./demandIndexStore.js";

import { LookupStore } from "../../../services/lookupService.js";

import { renderHeader } from "../renderers/renderHeader.js";

import { renderFilters } from "../renderers/renderFilters.js";

import { renderKPIs } from "../renderers/renderKPIs.js";

import { renderTable } from "../renderers/renderTable.js";

/**
 * =====================================================
 * Initialize
 * =====================================================
 */

export async function initializeDemandIndex(

    target

){

    try{

        showLoader();

        /**
         * ==========================================
         * Default Date Range
         * Last 30 Days
         * ==========================================
         */

        const toDate=

            new Date();

        const fromDate=

            new Date();

        fromDate.setDate(

            toDate.getDate()-30

        );

        /**
         * ==========================================
         * Build Demand Index
         * ==========================================
         */

        const rows=

            buildDemandIndex(

                fromDate,

                toDate

            );

        /**
         * ==========================================
         * Store
         * ==========================================
         */

        DemandIndexStore.rows=[

            ...rows

        ];

        DemandIndexStore.filteredRows=[

            ...rows

        ];

        /**
         * ==========================================
         * Header
         * ==========================================
         */

        await renderHeader(

            document.getElementById(

                "demandHeader"

            )

        );

        /**
         * ==========================================
         * Filters
         * ==========================================
         */

        await renderFilters(

            document.getElementById(

                "demandFilters"

            )

        );

        populateFilters();

        bindFilters();

        /**
         * ==========================================
         * KPI Cards
         * ==========================================
         */

        await renderKPIs(

            document.getElementById(

                "demandKPIs"

            ),

            DemandIndexStore.filteredRows

        );

        /**
         * ==========================================
         * Demand Table
         * ==========================================
         */

        await renderTable(

            document.getElementById(

                "demandTable"

            ),

            DemandIndexStore.filteredRows

        );

        /**
         * ==========================================
         * Empty State
         * ==========================================
         */

        const empty=

            document.getElementById(

                "demandEmpty"

            );

        if(empty){

            empty.style.display=

                DemandIndexStore.filteredRows.length

                ?

                "none"

                :

                "flex";

        }

    }

    catch(error){

        console.error(

            "Demand Index",

            error

        );

    }

    finally{

        hideLoader();

    }

}

/**
 * =====================================================
 * Loader
 * =====================================================
 */

function showLoader(){

    const loader=

        document.getElementById(

            "demandLoader"

        );

    if(loader){

        loader.style.display="flex";

    }

}

function hideLoader(){

    const loader=

        document.getElementById(

            "demandLoader"

        );

    if(loader){

        loader.style.display="none";

    }

}

/**
 * =====================================================
 * Populate Filters
 * =====================================================
 */

function populateFilters(){

    const brandFilter=

        document.getElementById(

            "diBrandFilter"

        );

    const categoryFilter=

        document.getElementById(

            "diCategoryFilter"

        );

    const statusFilter=

        document.getElementById(

            "diStatusFilter"

        );

    LookupStore.brands.forEach(

        brand=>{

            brandFilter.insertAdjacentHTML(

                "beforeend",

                `<option value="${brand}">${brand}</option>`

            );

        }

    );

    LookupStore.categories.forEach(

        category=>{

            categoryFilter.insertAdjacentHTML(

                "beforeend",

                `<option value="${category}">${category}</option>`

            );

        }

    );

    LookupStore.erpStatuses.forEach(

        status=>{

            statusFilter.insertAdjacentHTML(

                "beforeend",

                `<option value="${status}">${status}</option>`

            );

        }

    );

}

/**
 * =====================================================
 * Bind Filters
 * =====================================================
 */

function bindFilters(){

    document.getElementById(

        "diBrandFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    document.getElementById(

        "diCategoryFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    document.getElementById(

        "diStatusFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    document.getElementById(

        "diSearch"

    ).addEventListener(

        "input",

        applyFilters

    );

    document.getElementById(

        "diResetFilters"

    ).addEventListener(

        "click",

        resetFilters

    );

}

/**
 * =====================================================
 * Apply Filters
 * =====================================================
 */

async function applyFilters(){

    const brand=

        document.getElementById(

            "diBrandFilter"

        ).value;

    const category=

        document.getElementById(

            "diCategoryFilter"

        ).value;

    const status=

        document.getElementById(

            "diStatusFilter"

        ).value;

    const keyword=

        document.getElementById(

            "diSearch"

        )

        .value

        .trim()

        .toLowerCase();

    DemandIndexStore.filteredRows=

        DemandIndexStore.rows.filter(

            row=>{

                if(

                    brand &&

                    row.brand!==brand

                ){

                    return false;

                }

                if(

                    category &&

                    row.category!==category

                ){

                    return false;

                }

                if(

                    status &&

                    row.erpStatus!==status

                ){

                    return false;

                }

                if(keyword){

                    const styleId=

                        String(

                            row.styleId || ""

                        ).toLowerCase();

                    const erpSku=

                        String(

                            row.erpSku || ""

                        ).toLowerCase();

                    if(

                        !styleId.includes(

                            keyword

                        )

                        &&

                        !erpSku.includes(

                            keyword

                        )

                    ){

                        return false;

                    }

                }

                return true;

            }

        );

    await renderKPIs(

        document.getElementById(

            "demandKPIs"

        ),

        DemandIndexStore.filteredRows

    );

    await renderTable(

        document.getElementById(

            "demandTable"

        ),

        DemandIndexStore.filteredRows

    );

    const empty=

        document.getElementById(

            "demandEmpty"

        );

    if(empty){

        empty.style.display=

            DemandIndexStore.filteredRows.length

            ?

            "none"

            :

            "flex";

    }

}

/**
 * =====================================================
 * Reset Filters
 * =====================================================
 */

function resetFilters(){

    document.getElementById(

        "diBrandFilter"

    ).value="";

    document.getElementById(

        "diCategoryFilter"

    ).value="";

    document.getElementById(

        "diStatusFilter"

    ).value="";

    document.getElementById(

        "diSearch"

    ).value="";

    applyFilters();

}