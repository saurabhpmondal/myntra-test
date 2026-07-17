/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Climbing Rule
 * Version : V2.0
 * =====================================================
 */

import { MOVEMENT_RULES } from "../../config/movementRules.js";

export function climbing(

    movement

){

    return movement <=

        MOVEMENT_RULES.CLIMBING

        ?

        "📈 Climbing"

        :

        null;

}