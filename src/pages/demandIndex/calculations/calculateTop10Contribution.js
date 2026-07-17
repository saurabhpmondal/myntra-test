/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Top 10 Contribution
 * Version : V1.0
 * =====================================================
 */

import { topN } from "./aggregations/topN.js";

import { sum } from "./aggregations/sum.js";

/**
 * =====================================================
 * Top 10 Contribution
 * =====================================================
 */

export function calculateTop10Contribution(

    rows

){

    const top10 =

        topN(

            rows,

            "overallDW",

            10

        );

    return sum(

        top10,

        "overallDW"

    );

}