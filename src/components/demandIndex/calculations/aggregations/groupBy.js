/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Group By
 * Version : V1.0
 * =====================================================
 */

export function groupBy(

    rows,

    field

){

    const groups={};

    rows.forEach(

        row=>{

            const key=

                row[field] ||

                "";

            if(

                !groups[key]

            ){

                groups[key]=[];

            }

            groups[key].push(

                row

            );

        }

    );

    return groups;

}