/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Cumulative DW
 * Version : V1.0
 * =====================================================
 */

import { cumulative } from "./aggregations/cumulative.js";

/**
 * =====================================================
 * Calculate Cumulative DW
 *
 * Input rows must already be sorted
 * by Overall Rank / Overall DW.
 * =====================================================
 */

export function calculateCumulativeDW(

    rows

){

    return cumulative(

        rows,

        "overallDW",

        "cumulativeDW"

    );

}