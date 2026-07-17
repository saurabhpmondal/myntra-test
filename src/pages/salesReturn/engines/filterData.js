/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Filter Data
 * Version : V12.0
 * =====================================================
 */

import { DataStore } from "../../../services/dataService.js";

import { getFilteredSales } from "../../../services/filterService.js";

import { FilterState } from "../../../services/filterService.js";

import { LookupStore } from "../../../services/lookupService.js";

import { getPeriodKey } from "../../../services/periodService.js";

/**
 * =====================================================
 * Filter Sales & Returns
 * =====================================================
 */

export function filterData(){

    const sales = getFilteredSales();

    const returns = DataStore.returns.filter(row=>{

        if(FilterState.period!==null){

            const period = getPeriodKey(

                row.month,

                row.year

            );

            if(period!==FilterState.period){

                return false;

            }

        }

        const product =

            LookupStore.productMap[

                row.style_id

            ];

        if(!product){

            return false;

        }

        if(

            FilterState.brand!=="All"

            &&

            product.brand!==FilterState.brand

        ){

            return false;

        }

        if(

            FilterState.category!=="All"

            &&

            product.category!==FilterState.category

        ){

            return false;

        }

        if(

            FilterState.erpStatus!=="All"

            &&

            product.erpStatus!==FilterState.erpStatus

        ){

            return false;

        }

        if(

            FilterState.search.trim()

        ){

            const keyword =

                FilterState.search

                    .trim()

                    .toLowerCase();

            const matched =

                String(

                    row.style_id||""

                )

                .toLowerCase()

                .includes(keyword)

                ||

                String(

                    product.erpSku||""

                )

                .toLowerCase()

                .includes(keyword);

            if(!matched){

                return false;

            }

        }

        return true;

    });

    return{

        sales,

        returns

    };

}