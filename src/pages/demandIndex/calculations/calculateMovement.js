/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Movement
 * Version : V1.0
 * =====================================================
 */

/**
 * =====================================================
 * Calculate Movement
 *
 * Compares current rank with previous rank.
 * =====================================================
 */

export function calculateMovement(

    currentRows,

    previousRows

){

    if(

        !Array.isArray(currentRows)

    ){

        return [];

    }

    const previousRankMap={};

    (previousRows || []).forEach(

        row=>{

            previousRankMap[

                row.styleId

            ]=

                row.overallRank;

        }

    );

    currentRows.forEach(

        row=>{

            const previousRank=

                previousRankMap[

                    row.styleId

                ];

            row.previousRank=

                previousRank ||

                null;

            /**
             * ==========================================
             * New Entry
             * ==========================================
             */

            if(

                previousRank==null

            ){

                row.rankMovement=

                    "NEW";

                row.rankChange=

                    null;

                return;

            }

            const change=

                previousRank-

                row.overallRank;

            row.rankChange=

                change;

            if(

                change>0

            ){

                row.rankMovement=

                    "UP";

            }

            else if(

                change<0

            ){

                row.rankMovement=

                    "DOWN";

            }

            else{

                row.rankMovement=

                    "SAME";

            }

        }

    );

    return currentRows;

}