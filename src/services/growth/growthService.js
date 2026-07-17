/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Growth Service
 * Version : V1.2
 * =====================================================
 */

import { getGrowthBaseData } from "./growthHelper.js";
import { buildGrowthLookups, getLookup } from "./growthLookupEngine.js";
import { buildMonthData } from "./growthMonthEngine.js";
import {
    buildProjectionData,
    growthColor,
    projectionColor
} from "./growthProjectionEngine.js";
import { buildDailyData } from "./growthDailyEngine.js";
import { buildGrowthKpis } from "./growthKpiEngine.js";

export function getGrowthReport(){

    buildGrowthLookups();

    const base = getGrowthBaseData();

    const months = buildMonthData(base);

    const projection = buildProjectionData(base);

    const daily = buildDailyData(base);

    const columns = [

        {
            key:"styleId",
            label:"Style",
            align:"left"
        },

        {
            key:"erpSku",
            label:"ERP SKU",
            align:"left"
        },

        {
            key:"brand",
            label:"Brand",
            align:"left"
        },

        {
            key:"rating",
            label:"Rating",
            align:"center"
        },

        {
            key:"status",
            label:"Status",
            align:"center"
        },

        {
            key:"previous2",
            label:months.previous2Label,
            align:"center",
            format:"number"
        },

        {
            key:"previous",
            label:months.previousLabel,
            align:"center",
            format:"number"
        },

        {
            key:"current",
            label:months.currentLabel,
            align:"center",
            format:"number"
        },

        {
            key:"growth",
            label:"Growth %",
            align:"center"
        },

        {
            key:"drr",
            label:"DRR",
            align:"center"
        },

        {
            key:"projection",
            label:"Projection",
            align:"center",
            format:"number"
        },

        ...daily.dayColumns

    ];

    const rows = [];

    base.styleIds.forEach(styleId=>{

        const lookup = getLookup(styleId);

        const currentRows = base.currentRows.filter(
            r=>String(r.style_id)===styleId
        );

        const first =
            currentRows[0] ||
            base.previousRows.find(
                r=>String(r.style_id)===styleId
            ) ||
            base.previous2Rows.find(
                r=>String(r.style_id)===styleId
            );

        if(!first){

            return;

        }

        const previousSale =
            months.previousValues[styleId] || 0;

        const currentSale =
            months.values[styleId] || 0;

        const isNew =
            previousSale===0 &&
            currentSale>0;

        const row={

            styleId,

            styleLink:
                `https://www.myntra.com/${styleId}`,

            erpSku:lookup.erpSku,

            brand:first.brand || "",

            rating:lookup.rating || 0,

            status:lookup.status || "",

            previous2:
                months.previous2Values[styleId] || 0,

            previous:
                previousSale,

            current:
                currentSale,

            growth:
                isNew
                    ? "🟢 NEW"
                    : (projection.growth[styleId] || 0),

            growthValue:
                projection.growth[styleId] || 0,

            isNew,

            drr:
                projection.drr[styleId] || 0,

            projection:
                projection.projection[styleId] || 0,

            __growthClass:
                growthColor(
                    projection.growth[styleId],
                    isNew
                ),

            __projectionClass:
                projectionColor(
                    projection.projection[styleId],
                    previousSale
                )

        };

        daily.dayColumns.forEach(col=>{

            row[col.key] =

                daily.values[styleId]?.[col.key] || 0;

            row[`__${col.key}`] =

                daily.colors[styleId]?.[col.key] || "";

        });

        rows.push(row);

    });

    rows.sort((a,b)=>

        b.projection-a.projection

    );

    const kpis = buildGrowthKpis(rows);

    return{

        kpis,

        columns,

        rows,

        maxDay:daily.maxDay

    };

}

