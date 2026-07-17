/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Growth Month Engine
 * Version : V1.0
 * =====================================================
 */

import {
    groupByStyle,
    sum,
    getMonthLabel
} from "./growthHelper.js";

export function buildMonthData(base){

    const currentMap = groupByStyle(base.currentRows);

    const previousMap = groupByStyle(base.previousRows);

    const previous2Map = groupByStyle(base.previous2Rows);

    return{

        currentLabel:

            getMonthLabel(base.currentRows),

        previousLabel:

            getMonthLabel(base.previousRows),

        previous2Label:

            getMonthLabel(base.previous2Rows),

        values:{},

        previousValues:{},

        previous2Values:{}

    ,

        ...buildStyleValues(

            base.styleIds,

            currentMap,

            previousMap,

            previous2Map

        )

    };

}

function buildStyleValues(

    styleIds,

    currentMap,

    previousMap,

    previous2Map

){

    const values={};

    const previousValues={};

    const previous2Values={};

    styleIds.forEach(styleId=>{

        values[styleId]=sum(

            currentMap[styleId] || [],

            "qty"

        );

        previousValues[styleId]=sum(

            previousMap[styleId] || [],

            "qty"

        );

        previous2Values[styleId]=sum(

            previous2Map[styleId] || [],

            "qty"

        );

    });

    return{

        values,

        previousValues,

        previous2Values

    };

}