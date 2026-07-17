/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : FC Report Builder
 * Version : V1.0
 * =====================================================
 */

export function buildFCReport(

    warehouseRows

){

    const totalStock=

        warehouseRows.reduce(

            (sum,row)=>

                sum+

                Number(

                    row.stock||0

                ),

            0

        );

    const totalSale=

        warehouseRows.reduce(

            (sum,row)=>

                sum+

                Number(

                    row.soldQty||0

                ),

            0

        );

    return warehouseRows

    .map(

        row=>{

            const stock=

                Number(

                    row.stock||0

                );

            const sale=

                Number(

                    row.soldQty||0

                );

            const stockPer=

                totalStock

                ?

                (

                    stock/

                    totalStock

                )*100

                :

                0;

            const salePer=

                totalSale

                ?

                (

                    sale/

                    totalSale

                )*100

                :

                0;

            const sellThrough=

                stock

                ?

                (

                    sale/

                    stock

                )*100

                :

                0;

            return{

                fc:

                    row.shortName,

                warehouseName:

                    row.warehouseName,

                region:

                    row.region,

                stock,

                soldQty:

                    sale,

                sellThrough,

                stockPer,

                salePer,

                gap:

                    salePer-

                    stockPer

            };

        }

    )

    .sort(

        (a,b)=>

            b.soldQty-

            a.soldQty

    );

}