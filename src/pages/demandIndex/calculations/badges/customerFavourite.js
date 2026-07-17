/**
 * =====================================================
 * Customer Favourite
 * =====================================================
 */

export function customerFavourite(

    row

){

    if(

        Number(

            row.rating || 0

        )>=3.8

        &&

        Number(

            row.unitsSold || 0

        )>=20

    ){

        return [

            "❤️ Customer Favourite"

        ];

    }

    return [];

}