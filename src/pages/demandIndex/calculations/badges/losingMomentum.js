/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Losing Momentum Badge
 * Version : V2.0
 * =====================================================
 */

export function losingMomentum(

    row

){

    if(

        row.rankMovement==="DOWN"

        &&

        Math.abs(

            Number(

                row.rankChange || 0

            )

        )>=20

    ){

        return [

            "📉 Losing Momentum"

        ];

    }

    return [];

}