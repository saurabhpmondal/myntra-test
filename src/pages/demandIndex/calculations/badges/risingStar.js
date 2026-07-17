/**
 * =====================================================
 * Rising Star
 * =====================================================
 */

export function risingStar(

    row

){

    if(

        row.rankMovement==="NEW"

        &&

        row.overallRank<=100

    ){

        return [

            "🚀 Rising Star"

        ];

    }

    return [];

}