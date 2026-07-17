/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Core Styles
 * Version : V1.0
 * =====================================================
 */

import { calculateCumulativeDW } from "./calculateCumulativeDW.js";

/**
 * =====================================================
 * Core Styles
 *
 * Styles contributing first 80% DW.
 * =====================================================
 */

export function calculateCoreStyles(

    rows

){

    return calculateCumulativeDW(

        rows

    ).filter(

        row=>

            row.cumulativeDW<=0.80

    );

}