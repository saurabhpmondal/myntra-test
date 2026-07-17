/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Stable Rule
 * Version : V2.0
 * =====================================================
 */

import { MOVEMENT_RULES } from "../../config/movementRules.js";

export function stable(

    movement

){

    return(

        movement >=

        MOVEMENT_RULES.STABLE_MIN

        &&

        movement <=

        MOVEMENT_RULES.STABLE_MAX

    )

    ?

    "❄ Stable"

    :

    null;

}