/**
 * =====================================================
 * Nationwide Hero
 * =====================================================
 */

export function nationwideHero(

    row

){

    if(

        Number(

            row.stateCount || 0

        )>=5

        &&

        Number(

            row.unitsSold || 0

        )>10

    ){

        return [

            "🌍 Nationwide Hero"

        ];

    }

    return [];

}