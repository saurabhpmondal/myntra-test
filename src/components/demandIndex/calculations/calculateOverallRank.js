/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Overall Rank
 * Version : V1.1
 * =====================================================
 */

import { rankByMetric } from "./rankByMetric.js";

/**
 * =====================================================
 * Overall Rank
 * =====================================================
 */

export function calculateOverallRank(

    rows

){

    return rankByMetric(

        rows,

        "overallDW",

        "overallRank"

    );

}