/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Build Rows
 * Version : V1.0
 * =====================================================
 */

import { LookupStore }
from "../../../services/lookupService.js";

import { calculateUnitsSold }
from "../calculations/calculateUnitsSold.js";

import { calculateOverallDW }
from "../calculations/calculateOverallDW.js";

export function buildRows(

    grouped,

    sales

){

    const totalUnits=

        calculateUnitsSold(

            sales

        );

    return Object.entries(

        grouped

    )

    .map(

        ([styleId,rows])=>{

            const product=

                LookupStore.productMap[

                    styleId

                ] || {};

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

                rating:0,

                stateCount:0,

                unitsSold,

                overallDW:

                    calculateOverallDW(

                        unitsSold,

                        totalUnits

                    ),

                brandDW:0,

                overallRank:0,

                previousRank:null,

                rankChange:null,

                rankMovement:"NEW",

                brandRank:0,

                cumulativeDW:0,

                badges:[]

            };

        }

    )

    .filter(

        row=>

            row.unitsSold>0

    );

}