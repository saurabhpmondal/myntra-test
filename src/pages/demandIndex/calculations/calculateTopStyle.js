/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Top Style
 * Version : V1.0
 * =====================================================
 */

import { topN } from "./aggregations/topN.js";

/**
 * =====================================================
 * Top Style
 * =====================================================
 */

export function calculateTopStyle(

    rows

){

    return topN(

        rows,

        "overallDW",

        1

    )[0] || null;

}