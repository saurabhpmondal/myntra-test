/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Cumulative Calculator
 * Version : V1.0
 * =====================================================
 */

export function cumulative(

    rows,

    field,

    outputField

){

    let running=0;

    return rows.map(

        row=>{

            running+=

                Number(

                    row[field]||

                    0

                );

            return{

                ...row,

                [outputField]:

                    running

            };

        }

    );

}