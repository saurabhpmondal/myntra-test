/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index Builder
 * Version : V1.0
 * =====================================================
 */

import { DataStore } from "../../../services/dataService.js";

import { LookupStore } from "../../../services/lookupService.js";

import { calculateUnitsSold } from "../calculations/calculateUnitsSold.js";

import { calculateOverallDW } from "../calculations/calculateOverallDW.js";

import { calculateBrandDW } from "../calculations/calculateBrandDW.js";

import { calculateOverallRank } from "../calculations/calculateOverallRank.js";

import { calculateBrandRank } from "../calculations/calculateBrandRank.js";

import { calculateCumulativeDW } from "../calculations/calculateCumulativeDW.js";

import { calculateBadges } from "../calculations/calculateBadges.js";

/**
 * =====================================================
 * Build Demand Index
 * =====================================================
 */

export function buildDemandIndex(

    fromDate,

    toDate

){

    const sales = getSales(

        fromDate,

        toDate

    );

    const grouped =

        groupSalesByStyle(

            sales

        );

    let rows =

        buildRows(

            grouped,

            sales

        );

    rows =

        calculateBrandDemandWeight(

            rows

        );

    rows =

        calculateOverallRank(

            rows

        );

    rows =

        calculateBrandRank(

            rows

        );

    rows =

        calculateCumulativeDW(

            rows

        );

    rows.forEach(

        row=>{

            row.badges =

                calculateBadges(

                    row

                );

        }

    );

    return rows;

}

/**
 * =====================================================
 * Get Sales
 * =====================================================
 */

function getSales(

    fromDate,

    toDate

){

    const sales=[

    DataStore.sales || [];

    ];

    return sales.filter(

        row=>{

            const orderDate=

                new Date(

                    row.order_date

                );

            return(

                orderDate>=fromDate

                &&

                orderDate<=toDate

            );

        }

    );

}

/**
 * =====================================================
 * Group Sales
 * =====================================================
 */

function groupSalesByStyle(

    sales

){

    const map={};

    sales.forEach(

        row=>{

            const styleId=

                String(

                    row.style_id

                ).trim();

            if(

                !map[styleId]

            ){

                map[styleId]=[];

            }

            map[styleId].push(

                row

            );

        }

    );

    return map;

}

/**
 * =====================================================
 * Build Rows
 * =====================================================
 */

function buildRows(

    grouped,

    sales

){

    const totalUnits=

        calculateUnitsSold(

            sales

        );

    return Object.entries(

        grouped

    ).map(

        ([styleId,rows])=>{

            const product=

                LookupStore.productMap[styleId] || {};

            const unitsSold=

                calculateUnitsSold(

                    rows

                );

            return{

                styleId,

                erpSku:

                    product.erpSku || "",

                brand:

                    product.brand || "",

                category:

                    product.category || "",

                erpStatus:

                    product.erpStatus || "",

                mrp:

                    product.mrp || 0,

                tp:

                    product.tp || 0,

                launchDate:

                    product.launchDate || "",

                liveDate:

                    product.liveDate || "",

                unitsSold,

                overallDW:

                    calculateOverallDW(

                        unitsSold,

                        totalUnits

                    ),

                brandDW:0,

                overallRank:0,

                brandRank:0,

                cumulativeDW:0,

                badges:[]

            };

        }

    );

}

/**
 * =====================================================
 * Brand Demand Weight
 * =====================================================
 */

function calculateBrandDemandWeight(

    rows

){

    const brandTotals={};

    rows.forEach(

        row=>{

            if(

                !brandTotals[row.brand]

            ){

                brandTotals[row.brand]=0;

            }

            brandTotals[row.brand]+=

                row.unitsSold;

        }

    );

    rows.forEach(

        row=>{

            row.brandDW=

                calculateBrandDW(

                    row.unitsSold,

                    brandTotals[

                        row.brand

                    ]

                );

        }

    );

    return rows;

}

