/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Badge Engine
 * Version : V2.0
 * =====================================================
 */

import { marketLeader } from "./badges/marketLeader.js";

import { brandLeader } from "./badges/brandLeader.js";

import { top10 } from "./badges/top10.js";

import { top50 } from "./badges/top50.js";

import { eliteStyle } from "./badges/eliteStyle.js";

import { coreStyle } from "./badges/coreStyle.js";

export function calculateBadges(row){

    return[

        ...marketLeader(row),

        ...brandLeader(row),

        ...top10(row),

        ...top50(row),

        ...eliteStyle(row),

        ...coreStyle(row)

    ];

}