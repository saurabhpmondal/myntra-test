/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Falling Rule
 * Version : V2.0
 * =====================================================
 */

import { MOVEMENT_RULES } from "../../config/movementRules.js";

export function falling(

    movement

){

    return movement >=

        MOVEMENT_RULES.FALLING

        ?

        "⬇ Falling"

        :

        null;

}