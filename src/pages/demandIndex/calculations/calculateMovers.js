/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Movers
 * Version : V1.0
 * =====================================================
 */

import { MOVEMENT_RULES } from "../config/movementRules.js";

/**
 * =====================================================
 * Movement
 *
 * Negative = Improved Rank
 * Positive = Dropped Rank
 * =====================================================
 */

export function calculateMovement(

    previousRank,

    currentRank

){

    const movement=

        Number(currentRank||0)

        -

        Number(previousRank||0);

    if(

        movement<=

        MOVEMENT_RULES.FAST_CLIMBER

    ){

        return{

            badge:"🚀 Fast Climber",

            movement

        };

    }

    if(

        movement<=

        MOVEMENT_RULES.CLIMBING

    ){

        return{

            badge:"📈 Climbing",

            movement

        };

    }

    if(

        movement>=

        MOVEMENT_RULES.LOSING

    ){

        return{

            badge:"📉 Losing Momentum",

            movement

        };

    }

    if(

        movement>=

        MOVEMENT_RULES.FALLING

    ){

        return{

            badge:"⬇ Falling",

            movement

        };

    }

    return{

        badge:"❄ Stable",

        movement

    };

}