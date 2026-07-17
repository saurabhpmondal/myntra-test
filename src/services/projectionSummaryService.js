/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Projection Summary Service
 * Version : V1.2
 * =====================================================
 */

import { getReportRows } from "./reportHelper.js";
import { getComparisonData } from "./comparisonService.js";
import { projectMetric } from "./projectionService.js";

export function getProjectionSummary(){

    const rows = getReportRows();

    const {
        previousPeriod,
        previousSales
    } = getComparisonData();

    // -----------------------
    // Current Month
    // -----------------------

    const total = projectMetric(rows,"qty");

    const gmv = projectMetric(rows,"final_amount");

    const ppmp = projectMetric(
        rows.filter(r=>
            String(r.po_type).toUpperCase()==="PPMP"
        ),
        "qty"
    );

    const sjit = projectMetric(
        rows.filter(r=>
            String(r.po_type).toUpperCase()==="SJIT"
        ),
        "qty"
    );

    const sor = projectMetric(
        rows.filter(r=>
            String(r.po_type).toUpperCase()==="SOR"
        ),
        "qty"
    );

    // -----------------------
    // Brand Projection
    // -----------------------

    const brands = {};

    [...new Set(rows.map(r=>r.brand))]
        .sort()
        .forEach(brand=>{

            brands[brand] = projectMetric(
                rows.filter(r=>r.brand===brand),
                "qty"
            );

        });

    // -----------------------
    // Previous Month
    // -----------------------

    const previousRows = previousSales.map(row=>{

        const current = rows.find(
            r=>r.style_id===row.style_id
        );

        return{

            ...row,

            brand:
                current?.brand ||
                row.brand ||
                "Unknown"

        };

    });

    const previous = {

        total: sum(previousRows,"qty"),

        gmv: sum(previousRows,"final_amount"),

        ppmp: sum(
            previousRows.filter(r=>
                String(r.po_type).toUpperCase()==="PPMP"
            ),
            "qty"
        ),

        sjit: sum(
            previousRows.filter(r=>
                String(r.po_type).toUpperCase()==="SJIT"
            ),
            "qty"
        ),

        sor: sum(
            previousRows.filter(r=>
                String(r.po_type).toUpperCase()==="SOR"
            ),
            "qty"
        ),

        brands:{}

    };

    Object.keys(brands).forEach(brand=>{

        previous.brands[brand] = sum(
            previousRows.filter(r=>r.brand===brand),
            "qty"
        );

    });

    return{

        total,

        gmv,

        ppmp,

        sjit,

        sor,

        brands,

        previous,

        currentMonth:getMonthName(rows),

        previousPeriod:getPreviousMonthName(previousPeriod)

    };

}

function sum(rows,column){

    return rows.reduce(

        (total,row)=>

            total + Number(row[column] || 0),

        0

    );

}

function getMonthName(rows){

    if(!rows.length){

        return "";

    }

    const month = String(rows[0].month || "").toUpperCase();

    const months={

        JAN:"JAN",
        FEB:"FEB",
        MAR:"MAR",
        APR:"APR",
        MAY:"MAY",
        JUNE:"JUN",
        JULY:"JUL",
        AUG:"AUG",
        SEP:"SEP",
        OCT:"OCT",
        NOV:"NOV",
        DEC:"DEC"

    };

    return months[month] || month;

}

function getPreviousMonthName(period){

    const months={

        "01":"JAN",
        "02":"FEB",
        "03":"MAR",
        "04":"APR",
        "05":"MAY",
        "06":"JUN",
        "07":"JUL",
        "08":"AUG",
        "09":"SEP",
        "10":"OCT",
        "11":"NOV",
        "12":"DEC"

    };

    const value = String(period);

    if(value.length===6){

        return months[value.substring(4,6)] || value;

    }

    return value;

}