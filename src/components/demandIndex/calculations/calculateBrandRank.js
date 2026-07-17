/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Brand Rank
 * Version : V2.0
 * =====================================================
 */

import { rankByMetric } from "./rankByMetric.js";

/**
 * =====================================================
 * Calculate Brand Rank
 * =====================================================
 */

export function calculateBrandRank(

    rows

){

    if(

        !Array.isArray(rows)

    ){

        return [];

    }

    const brands={};

    rows.forEach(

        row=>{

            const brand=

                row.brand || "";

            if(

                !brands[brand]

            ){

                brands[brand]=[];

            }

            brands[brand].push(

                row

            );

        }

    );

    const ranked=[];

    Object.values(

        brands

    ).forEach(

        brandRows=>{

            ranked.push(

                ...rankByMetric(

                    brandRows,

                    "brandDW",

                    "brandRank"

                )

            );

        }

    );

    return ranked;

}