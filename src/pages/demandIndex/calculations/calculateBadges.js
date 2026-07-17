/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Badge Engine
 * Version : V3.0
 * =====================================================
 */

import { marketLeader } from "./badges/marketLeader.js";

import { brandLeader } from "./badges/brandLeader.js";

import { top10 } from "./badges/top10.js";

import { top50 } from "./badges/top50.js";

import { coreStyle } from "./badges/coreStyle.js";

import { risingStar } from "./badges/risingStar.js";

import { climbing } from "./badges/climbing.js";

import { losingMomentum } from "./badges/losingMomentum.js";

import { stable } from "./badges/stable.js";

import { customerFavourite } from "./badges/customerFavourite.js";

import { nationwideHero } from "./badges/nationwideHero.js";

export function calculateBadges(

    row

){

    return[

        ...marketLeader(row),

        ...brandLeader(row),

        ...top10(row),

        ...top50(row),

        ...coreStyle(row),

        ...risingStar(row),

        ...climbing(row),

        ...losingMomentum(row),

        ...stable(row),

        ...customerFavourite(row),

        ...nationwideHero(row)

    ];

}