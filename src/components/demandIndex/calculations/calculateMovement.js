/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Movement Engine
 * Version : V4.0
 * =====================================================
 */

import { fastClimber } from "./movement/fastClimber.js";

import { climbing } from "./movement/climbing.js";

import { stable } from "./movement/stable.js";

import { falling } from "./movement/falling.js";

import { losingMomentum } from "./movement/losingMomentum.js";

/**
 * =====================================================
 * Calculate Movement
 * =====================================================
 */

export function calculateMovement(

    previousRank,

    currentRank

){

    const movement =

        Number(currentRank || 0)

        -

        Number(previousRank || 0);

    return{

        movement,

        badge:

            fastClimber(

                movement

            )

            ||

            climbing(

                movement

            )

            ||

            stable(

                movement

            )

            ||

            falling(

                movement

            )

            ||

            losingMomentum(

                movement

            )

            ||

            ""

    };

}