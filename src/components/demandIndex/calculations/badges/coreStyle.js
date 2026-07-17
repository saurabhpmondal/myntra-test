/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Core Style Badge
 * Version : V1.0
 * =====================================================
 */

import { BADGE_RULES } from "../../config/badgeRules.js";

export function coreStyle(row){

    if(

        row.cumulativeDW<=

        BADGE_RULES.CORE_STYLE

    ){

        return[

            "🎯 Core Style"

        ];

    }

    return[];

}