/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Brand Leader Badge
 * Version : V1.0
 * =====================================================
 */

import { BADGE_RULES } from "../../config/badgeRules.js";

export function brandLeader(row){

    if(

        row.brandRank===

        BADGE_RULES.BRAND_LEADER

    ){

        return[

            "🥇 Brand Leader"

        ];

    }

    return[];

}