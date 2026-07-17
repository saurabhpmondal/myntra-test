/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Units Sold
 * Version : V1.0
 * =====================================================
 */

export function calculateUnitsSold(

    rows

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

        )=>{

            return total +

                Number(

                    row.units ||

                    row.qty ||

                    0

                );

        },

        0

    );

}