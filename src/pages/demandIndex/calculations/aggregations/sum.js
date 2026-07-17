/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Sum Aggregation
 * Version : V1.0
 * =====================================================
 */

export function sum(

    rows,

    field

){

    if(

        !Array.isArray(rows)

    ){

        return 0;

    }

    return rows.reduce(

        (

            total,

            row

        )=>

            total +

            Number(

                row[field] ||

                0

            ),

        0

    );

}