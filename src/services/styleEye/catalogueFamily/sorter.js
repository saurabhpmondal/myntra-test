/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Catalogue Family Sorter
 * Version : V1.0
 * =====================================================
 */

import {

    compareStyleId

} from "./helpers.js";

/**
 * =====================================================
 * Sort Tiles
 *
 * Priority
 * 1. Current Style
 * 2. Highest Sale
 * 3. ERP SKU
 * 4. Style ID
 * =====================================================
 */

export function sortTiles(

    tiles

){

    if(

        !tiles ||

        !tiles.length

    ){

        return [];

    }

    return [...tiles].sort((a,b)=>{

        // ==============================
        // Current Style Always First
        // ==============================

        if(

            a.isCurrent

        ){

            return -1;

        }

        if(

            b.isCurrent

        ){

            return 1;

        }

        // ==============================
        // Higher Sale First
        // ==============================

        if(

            a.sale90D!==

            b.sale90D

        ){

            return (

                b.sale90D||0

            )-

            (

                a.sale90D||0

            );

        }

        // ==============================
        // ERP SKU
        // ==============================

        const erpCompare =

            String(

                a.erpSku||""

            )

            .localeCompare(

                String(

                    b.erpSku||""

                ),

                undefined,

                {

                    numeric:true,

                    sensitivity:"base"

                }

            );

        if(

            erpCompare!==0

        ){

            return erpCompare;

        }

        // ==============================
        // Style ID
        // ==============================

        return compareStyleId(

            a.styleId,

            b.styleId

        );

    });

}

/**
 * =====================================================
 * Limit Tiles
 *
 * Maximum visible cards
 * =====================================================
 */

export function limitTiles(

    tiles,

    limit=10

){

    if(

        !tiles ||

        tiles.length<=limit

    ){

        return tiles;

    }

    return tiles.slice(

        0,

        limit

    );

}