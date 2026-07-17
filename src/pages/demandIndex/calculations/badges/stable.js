/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Stable Badge
 * Version : V2.0
 * =====================================================
 */

export function stable(

    row

){

    if(

        row.rankMovement==="SAME"

    ){

        return [

            "❄ Stable"

        ];

    }

    if(

        row.rankMovement==="UP"

        &&

        Number(

            row.rankChange || 0

        )<=2

    ){

        return [

            "❄ Stable"

        ];

    }

    if(

        row.rankMovement==="DOWN"

        &&

        Math.abs(

            Number(

                row.rankChange || 0

            )

        )<=2

    ){

        return [

            "❄ Stable"

        ];

    }

    return [];

}