/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Month Wise GMV Service
 * Version : V1.0
 * =====================================================
 */

import { getTrendSales } from "./filterService.js";
import { getPeriodKey } from "./periodService.js";
import { formatCompactCurrency } from "../utils/formatter.js";

export function getMonthWiseGMV() {

    const sales = getTrendSales();

    const monthMap = {};
    const brandSet = new Set();

    sales.forEach(row => {

        const key = getPeriodKey(row.month, row.year);

        if (!monthMap[key]) {

            monthMap[key] = {

                month: row.month,

                year: row.year,

                rows: []

            };

        }

        monthMap[key].rows.push(row);

        brandSet.add(row.brand || "Unknown");

    });

    const periods = Object.values(monthMap)

        .sort((a, b) =>
            getPeriodKey(a.month, a.year) -
            getPeriodKey(b.month, b.year)
        )

        .slice(-6);

    const brands = [...brandSet].sort();

    const columns = [

        {

            key: "month",

            label: "Month",

            align: "left"

        }

    ];

    brands.forEach(brand => {

        columns.push({

            key: brand,

            label: brand,

            align: "center",

            renderer: value => formatCompactCurrency(value)

        });

    });

    const rows = [];

    periods.forEach(period => {

        const row = {

            month: `${short(period.month)}-${String(period.year).slice(2)}`

        };

        brands.forEach(brand => {

            row[brand] = period.rows

                .filter(r => (r.brand || "Unknown") === brand)

                .reduce(

                    (t, r) =>

                        t + Number(r.final_amount || 0),

                    0

                );

        });

        rows.push(row);

    });

    return {

        columns,

        rows

    };

}

function short(month){

    const map={

        JAN:"Jan",

        FEB:"Feb",

        MAR:"Mar",

        APR:"Apr",

        MAY:"May",

        JUNE:"Jun",

        JULY:"Jul",

        AUG:"Aug",

        SEP:"Sep",

        OCT:"Oct",

        NOV:"Nov",

        DEC:"Dec"

    };

    return map[String(month).toUpperCase()] || month;

}