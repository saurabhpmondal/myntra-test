/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Elite Style Badge
 * Version : V1.0
 * =====================================================
 */

import { BADGE_RULES } from "../../config/badgeRules.js";

export function eliteStyle(row){

    if(

        row.overallDW>=

        BADGE_RULES.ELITE_DW

    ){

        return[

            "💎 Elite Style"

        ];

    }

    return[];

}