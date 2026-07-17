/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Top N
 * Version : V1.0
 * =====================================================
 */

export function topN(

    rows,

    field,

    limit=10

){

    return [...rows]

        .sort(

            (a,b)=>

                Number(

                    b[field]||0

                )

                -

                Number(

                    a[field]||0

                )

        )

        .slice(

            0,

            limit

        );

}