/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Market Leader Badge
 * Version : V1.0
 * =====================================================
 */

import { BADGE_RULES } from "../../config/badgeRules.js";

export function marketLeader(row){

    if(

        row.overallRank===

        BADGE_RULES.MARKET_LEADER

    ){

        return[

            "👑 Market Leader"

        ];

    }

    return[];

}