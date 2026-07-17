/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Fast Climber Rule
 * Version : V2.0
 * =====================================================
 */

import { MOVEMENT_RULES } from "../../config/movementRules.js";

export function fastClimber(

    movement

){

    return movement <=

        MOVEMENT_RULES.FAST_CLIMBER

        ?

        "🚀 Fast Climber"

        :

        null;

}