/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Core Style Badge
 * Version : V2.0
 * =====================================================
 */

import { BADGE_RULES } from "../../config/badgeRules.js";

/**
 * =====================================================
 * Core Style
 *
 * Rule
 *
 * 1. Cumulative DW <= 80%
 * 2. Units Sold > 20
 * =====================================================
 */

export function coreStyle(

    row

){

    if(

        row.cumulativeDW <=

        BADGE_RULES.CORE_STYLE

        &&

        Number(

            row.unitsSold || 0

        ) > 20

    ){

        return [

            "🎯 Core Style"

        ];

    }

    return [];

}