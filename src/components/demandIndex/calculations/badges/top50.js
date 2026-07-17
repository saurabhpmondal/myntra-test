/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Top 50 Badge
 * Version : V1.0
 * =====================================================
 */

import { BADGE_RULES } from "../../config/badgeRules.js";

export function top50(row){

    if(

        row.overallRank<=

        BADGE_RULES.TOP_50

    ){

        return[

            "⭐ Top 50"

        ];

    }

    return[];

}