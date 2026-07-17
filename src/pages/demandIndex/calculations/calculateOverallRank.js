/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Overall Rank
 * Version : V2.0
 * =====================================================
 */

/**
 * =====================================================
 * Overall Rank
 *
 * Business Logic
 *
 * Rank all styles by Units Sold.
 *
 * Highest Units Sold = Rank 1
 * =====================================================
 */

export function calculateOverallRank(

    rows

){

    if(

        !Array.isArray(rows)

    ){

        return [];

    }

    const ranked=[

        ...rows

    ].sort(

        (a,b)=>

            Number(

                b.unitsSold||0

            )

            -

            Number(

                a.unitsSold||0

            )

    );

    ranked.forEach(

        (

            row,

            index

        )=>{

            row.overallRank=

                index+1;

        }

    );

    return ranked;

}