/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Ads KPI Engine
 * Version : V1.2
 * =====================================================
 */

import {

    createEmptyAdsMetrics,

    mergeAdsMetrics,

    finalizeAdsMetrics

} from "./adsCalculation.js";

export function buildAdsKpis(dailyRows){

    const total = createEmptyAdsMetrics();

    dailyRows.forEach(row=>{

        mergeAdsMetrics(

            total,

            row

        );

    });

    finalizeAdsMetrics(total);

    return [

        {

            title:"Impressions",

            value:Number(total.impressions)
                .toLocaleString("en-IN"),

            icon:"eye",

            className:"primary"

        },

        {

            title:"Clicks",

            value:Number(total.clicks)
                .toLocaleString("en-IN"),

            icon:"mouse-pointer-click",

            className:"info"

        },

        {

            title:"CTR",

            value:`${Number(total.ctr).toFixed(2)}%`,

            icon:"percent",

            className:"warning"

        },

        {

            title:"Units Sold",

            value:Number(total.units)
                .toLocaleString("en-IN"),

            icon:"shopping-cart",

            className:"success"

        },

        {

            title:"Revenue",

            value:Math.round(
                Number(total.revenue)
            ).toLocaleString("en-IN"),

            prefix:"₹",

            icon:"indian-rupee",

            className:"success"

        },

        {

            title:"Spend",

            value:Math.round(
                Number(total.spend)
            ).toLocaleString("en-IN"),

            prefix:"₹",

            icon:"wallet",

            className:"danger"

        },

        {

            title:"ROI",

            value:Number(total.roi)
                .toFixed(2),

            icon:"trending-up",

            className:"primary"

        }

    ];

}