/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Losing Momentum Rule
 * Version : V2.0
 * =====================================================
 */

import { MOVEMENT_RULES } from "../../config/movementRules.js";

export function losingMomentum(

    movement

){

    return movement >=

        MOVEMENT_RULES.LOSING

        ?

        "📉 Losing Momentum"

        :

        null;

}