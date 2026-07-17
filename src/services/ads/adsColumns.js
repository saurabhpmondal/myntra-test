/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Ads Columns
 * Version : V1.1
 * =====================================================
 */

const formatNumber = value=>

    Number(value || 0)

        .toLocaleString("en-IN");

const formatCurrency = value=>

    "₹"+

    Math.round(

        Number(value || 0)

    ).toLocaleString("en-IN");

const formatPercent = value=>

    `${Number(value || 0).toFixed(2)}%`;

const formatDecimal = value=>

    Number(value || 0).toFixed(2);

export function getDailyAdsColumns(){

    return[

        {

            key:"date",

            label:"Date"

        },

        {

            key:"spend",

            label:"Spend",

            renderer:formatCurrency

        },

        {

            key:"impressions",

            label:"Impressions",

            renderer:formatNumber

        },

        {

            key:"clicks",

            label:"Clicks",

            renderer:formatNumber

        },

        {

            key:"ctr",

            label:"CTR",

            renderer:formatPercent

        },

        {

            key:"cvr",

            label:"CVR",

            renderer:formatPercent

        },

        {

            key:"units",

            label:"Units Sold",

            renderer:formatNumber

        },

        {

            key:"revenue",

            label:"Revenue",

            renderer:formatCurrency

        },

        {

            key:"roi",

            label:"ROI",

            renderer:formatDecimal

        }

    ];

}

export function getCampaignAdsColumns(){

    return[

        {

            key:"campaignName",

            label:"Campaign"

        },

        {

            key:"spend",

            label:"Spend",

            renderer:formatCurrency

        },

        {

            key:"impressions",

            label:"Impressions",

            renderer:formatNumber

        },

        {

            key:"clicks",

            label:"Clicks",

            renderer:formatNumber

        },

        {

            key:"ctr",

            label:"CTR",

            renderer:formatPercent

        },

        {

            key:"cvr",

            label:"CVR",

            renderer:formatPercent

        },

        {

            key:"units",

            label:"Units Sold",

            renderer:formatNumber

        },

        {

            key:"revenue",

            label:"Revenue",

            renderer:formatCurrency

        },

        {

            key:"roi",

            label:"ROI",

            renderer:formatDecimal

        }

    ];

}

export function getAdgroupAdsColumns(){

    return[

        {

            key:"adgroupName",

            label:"Ad Group"

        },

        {

            key:"spend",

            label:"Spend",

            renderer:formatCurrency

        },

        {

            key:"impressions",

            label:"Impressions",

            renderer:formatNumber

        },

        {

            key:"clicks",

            label:"Clicks",

            renderer:formatNumber

        },

        {

            key:"ctr",

            label:"CTR",

            renderer:formatPercent

        },

        {

            key:"cvr",

            label:"CVR",

            renderer:formatPercent

        },

        {

            key:"units",

            label:"Units Sold",

            renderer:formatNumber

        },

        {

            key:"revenue",

            label:"Revenue",

            renderer:formatCurrency

        },

        {

            key:"roi",

            label:"ROI",

            renderer:formatDecimal

        }

    ];

}