/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Business KPI Service
 * Version : V1.0
 * =====================================================
 */

import { getReportRows } from "./reportHelper.js";
import { projectMetric } from "./projectionService.js";
import { DataStore } from "./dataService.js";

export function getBusinessKPIs(){

    const rows = getReportRows();

    // -----------------------------
    // Current Month Projection
    // -----------------------------

    const projection = projectMetric(
        rows,
        "qty"
    );

    // -----------------------------
    // Last 6 Month Sale
    // -----------------------------

    const latestPeriods = getLatestSixPeriods(rows);

    const sixMonthSale = rows
        .filter(r=>latestPeriods.has(periodKey(r)))
        .reduce(
            (t,r)=>t+Number(r.qty||0),
            0
        );

    // -----------------------------
    // Freshness %
    // (Placeholder - Service Later)
    // -----------------------------

    const freshness = "--";

    // -----------------------------
    // Live Styles
    // (Placeholder - Service Later)
    // -----------------------------

    const live = "--";

    return [

        {

            title:"6 Month Sale",

            value:formatNumber(sixMonthSale),

            subtitle:"Units Sold"

        },

        {

            title:"Current Projection",

            value:formatNumber(projection.projected),

            subtitle:"Projected Units"

        },

        {

            title:"Freshness",

            value:freshness,

            subtitle:"0-30 Day Contribution"

        },

        {

            title:"Live Styles",

            value:live,

            subtitle:"Today's Live Count"

        }

    ];

}

function periodKey(row){

    return Number(row.year)*100 + monthNo(row.month);

}

function monthNo(month){

    const months={

        JAN:1,
        FEB:2,
        MAR:3,
        APR:4,
        MAY:5,
        JUNE:6,
        JULY:7,
        AUG:8,
        SEP:9,
        OCT:10,
        NOV:11,
        DEC:12

    };

    return months[
        String(month).toUpperCase()
    ]||0;

}

function getLatestSixPeriods(rows){

    const periods=[
        ...new Set(
            rows.map(periodKey)
        )
    ].sort((a,b)=>b-a);

    return new Set(
        periods.slice(0,6)
    );

}

function formatNumber(value){

    return Number(value||0).toLocaleString("en-IN");

}