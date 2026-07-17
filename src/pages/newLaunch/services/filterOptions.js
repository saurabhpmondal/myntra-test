/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Filter Options
 * Version : V1.0
 * =====================================================
 */

import {

    NewLaunchStore

}

from "./newLaunchStore.js";

/**
 * =====================================================
 * Brand Options
 * =====================================================
 */

export function getBrandOptions(){

    return [

        ...new Set(

            NewLaunchStore

            .launchRows

            .map(

                row=>row.brand

            )

            .filter(

                Boolean

            )

        )

    ]

    .sort();

}

/**
 * =====================================================
 * Status Options
 * =====================================================
 */

export function getStatusOptions(){

    return[

        "🚀 Hot",

        "🟢 Good",

        "🟡 Slow",

        "🔴 Dead"

    ];

}

/**
 * =====================================================
 * Launch Window Options
 * =====================================================
 */

export function getLaunchWindowOptions(){

    return[

        {

            label:"Last 30 Days",

            value:30

        },

        {

            label:"Last 45 Days",

            value:45

        },

        {

            label:"Last 60 Days",

            value:60

        },

        {

            label:"Last 90 Days",

            value:90

        }

    ];

}