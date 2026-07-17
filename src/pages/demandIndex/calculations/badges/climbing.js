/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Climbing Badge
 * Version : V2.0
 * =====================================================
 */

export function climbing(

    row

){

    if(

        row.rankMovement==="UP"

        &&

        Number(

            row.rankChange || 0

        )>=20

    ){

        return [

            "📈 Climbing"

        ];

    }

    return [];

}