/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Brand Demand Weight
 * Version : V1.0
 * =====================================================
 */

import { calculateBrandDW }
from "../calculations/calculateBrandDW.js";

export function calculateBrandDemandWeight(

    rows

){

    const brandTotals={};

    rows.forEach(

        row=>{

            const brand=

                row.brand || "";

            if(

                !brandTotals[

                    brand

                ]

            ){

                brandTotals[

                    brand

                ]=0;

            }

            brandTotals[

                brand

            ]+=

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