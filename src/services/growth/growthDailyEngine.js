/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Growth Daily Engine
 * Version : V1.1
 * =====================================================
 */

import {
    groupByStyle,
    getMaxSaleDay,
    getMonthDays
} from "./growthHelper.js";

export function buildDailyData(base){

    const currentMap = groupByStyle(base.currentRows);

    // ==========================================
    // Historical Month = Full Month
    // Latest Month = MTD
    // ==========================================

    const isLatestMonth =

        base.currentPeriod === base.latestPeriod;

    const maxDay = isLatestMonth

        ? getMaxSaleDay(base.currentRows)

        : getMonthDays(base.currentRows);

    const dayColumns = [];

    for(let day=1;day<=maxDay;day++){

        dayColumns.push({

            key:`day_${day}`,

            label:String(day),

            align:"center",

            format:"number"

        });

    }

    const values = {};

    const colors = {};

    base.styleIds.forEach(styleId=>{

        const rows = currentMap[styleId] || [];

        values[styleId] = {};

        colors[styleId] = {};

        // ==========================================
        // Day Sales
        // ==========================================

        rows.forEach(row=>{

            const day = Number(row.date);

            const qty = Number(row.qty || 0);

            const key = `day_${day}`;

            values[styleId][key] =

                (values[styleId][key] || 0)

                + qty;

        });

        // Fill Missing Days

        for(let day=1;day<=maxDay;day++){

            const key = `day_${day}`;

            if(values[styleId][key]===undefined){

                values[styleId][key]=0;

            }

        }

        // ==========================================
        // Day Comparison Color
        // ==========================================

        for(let day=2;day<=maxDay;day++){

            const yesterday =

                values[styleId][`day_${day-1}`];

            const today =

                values[styleId][`day_${day}`];

            if(today>yesterday){

                colors[styleId][`day_${day}`] =

                    "text-success";

            }

            else if(today<yesterday){

                colors[styleId][`day_${day}`] =

                    "text-danger";

            }

            else{

                colors[styleId][`day_${day}`] = "";

            }

        }

    });

    return{

        maxDay,

        dayColumns,

        values,

        colors

    };

}

export function getDayValue(

    dailyData,

    styleId,

    day

){

    return (

        dailyData.values[styleId] ||

        {}

    )[

        `day_${day}`

    ] || 0;

}

export function getDayColor(

    dailyData,

    styleId,

    day

){

    return (

        dailyData.colors[styleId] ||

        {}

    )[

        `day_${day}`

    ] || "";

}