/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Comparison Service
 * Version : V1.2
 * =====================================================
 */

import { DataStore } from "./dataService.js";
import {
    FilterState,
    getSalesByPeriod
} from "./filterService.js";

import { getPeriodKey } from "./periodService.js";

/**
 * Returns latest available period
 * before current period.
 */

export function getPreviousPeriod(currentPeriod){

    const periods = new Set();

    DataStore.sales.forEach(row=>{

        const key = getPeriodKey(
            row.month,
            row.year
        );

        if(key < currentPeriod){

            periods.add(key);

        }

    });

    if(periods.size===0){

        return null;

    }

    return Math.max(...periods);

}

/**
 * Returns current &
 * previous period sales.
 */

export function getComparisonData(){

    const currentPeriod = FilterState.period;

    const previousPeriod = getPreviousPeriod(
        currentPeriod
    );

    return{

        currentPeriod,

        previousPeriod,

        currentSales:getSalesByPeriod(
            currentPeriod
        ),

        previousSales:previousPeriod
            ?getSalesByPeriod(previousPeriod)
            :[]

    };

}

/**
 * Growth %
 */

export function calculateGrowth(
    current,
    previous
){

    current = Number(current)||0;

    previous = Number(previous)||0;

    if(previous===0){

        return 0;

    }

    return Number(

        (
            (
                current-previous
            )/
            previous
        )*100

    );

}

/**
 * Format growth.
 */

export function formatGrowth(value){

    const n = Number(value)||0;

    return `${n>=0?"+":""}${n.toFixed(1)}%`;

}