/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Build Ranked Rows
 * Version : V1.0
 * =====================================================
 */

import { calculateBrandDemandWeight }
from "./calculateBrandDemandWeight.js";

import { calculateOverallRank }
from "../calculations/calculateOverallRank.js";

import { calculateBrandRank }
from "../calculations/calculateBrandRank.js";

export function buildRankedRows(

    rows

){

    rows=

        calculateBrandDemandWeight(

            rows

        );

    rows=

        calculateOverallRank(

            rows

        );

    rows=

        calculateBrandRank(

            rows

        );

    return rows;

}