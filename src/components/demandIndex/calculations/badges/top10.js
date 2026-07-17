/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Top 10 Badge
 * Version : V1.0
 * =====================================================
 */

import { BADGE_RULES } from "../../config/badgeRules.js";

export function top10(row){

    if(

        row.overallRank<=

        BADGE_RULES.TOP_10

    ){

        return[

            "🔥 Top 10"

        ];

    }

    return[];

}