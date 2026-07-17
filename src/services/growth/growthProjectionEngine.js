/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Growth Projection Engine
 * Version : V1.2
 * =====================================================
 */

import {
    groupByStyle,
    sum,
    getMaxSaleDay,
    getMonthDays
} from "./growthHelper.js";

export function buildProjectionData(base){

    const currentMap = groupByStyle(base.currentRows);
    const previousMap = groupByStyle(base.previousRows);

    const saleDays = Math.max(
        getMaxSaleDay(base.currentRows),
        1
    );

    const monthDays = getMonthDays(base.currentRows);

    const drr = {};
    const projection = {};
    const growth = {};
    const isNew = {};

    base.styleIds.forEach(styleId=>{

        const currentSale = sum(
            currentMap[styleId] || [],
            "qty"
        );

        const previousSale = sum(
            previousMap[styleId] || [],
            "qty"
        );

        const currentDRR =
            currentSale / saleDays;

        const projectedSale =
            Math.round(
                currentDRR * monthDays
            );

        let growthPercent = 0;

        // ==============================
        // NEW STYLE
        // ==============================

        if(
            previousSale===0 &&
            currentSale>0
        ){

            isNew[styleId]=true;

        }else{

            isNew[styleId]=false;

            if(previousSale>0){

                growthPercent=

                    (
                        (
                            projectedSale-
                            previousSale
                        )
                        /
                        previousSale
                    )*100;

            }

        }

        drr[styleId]=Number(
            currentDRR.toFixed(2)
        );

        projection[styleId]=projectedSale;

        growth[styleId]=Number(
            growthPercent.toFixed(2)
        );

    });

    return{

        saleDays,

        monthDays,

        drr,

        projection,

        growth,

        isNew

    };

}

export function projectionColor(
    projection,
    previous
){

    if(projection>previous){

        return "text-success";

    }

    if(projection<previous){

        return "text-danger";

    }

    return "";

}

export function growthColor(
    growth,
    isNew=false
){

    if(isNew){

        return "badge-new";

    }

    if(growth>0){

        return "text-success";

    }

    if(growth<0){

        return "text-danger";

    }

    return "";

}