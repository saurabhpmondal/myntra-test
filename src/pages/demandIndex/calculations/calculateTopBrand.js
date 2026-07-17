/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Top Brand
 * Version : V1.0
 * =====================================================
 */

import { groupBy } from "./aggregations/groupBy.js";

import { sum } from "./aggregations/sum.js";

/**
 * =====================================================
 * Top Brand
 * =====================================================
 */

export function calculateTopBrand(

    rows

){

    const groups =

        groupBy(

            rows,

            "brand"

        );

    let winner = null;

    let highest = 0;

    Object.entries(

        groups

    ).forEach(

        ([brand,data])=>{

            const total =

                sum(

                    data,

                    "overallDW"

                );

            if(

                total > highest

            ){

                highest = total;

                winner = {

                    brand,

                    overallDW:total

                };

            }

        }

    );

    return winner;

}