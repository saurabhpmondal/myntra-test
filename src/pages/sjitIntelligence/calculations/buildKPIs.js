/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SJIT KPI Builder
 * Version : V1.1
 * =====================================================
 */

export function buildKPIs(

    warehouseRows,

    salesRows

){

    /**
     * ==========================================
     * Total Stock
     * ==========================================
     */

    const totalStock=

        warehouseRows.reduce(

            (sum,row)=>

                sum+

                Number(

                    row.stock||0

                ),

            0

        );

    /**
     * ==========================================
     * Total Sale
     * ==========================================
     */

    const totalSale=

        salesRows.reduce(

            (sum,row)=>

                sum+

                Number(

                    row.qty||0

                ),

            0

        );

    /**
     * ==========================================
     * Sell Through %
     * ==========================================
     */

    const sellThrough=

        totalStock

        ?

        (

            totalSale/

            totalStock

        )*100

        :

        0;

    /**
     * ==========================================
     * Top FC
     * ==========================================
     */

    const topFC=

        warehouseRows.length

        ?

        warehouseRows[0]

        :

        null;

    /**
     * ==========================================
     * Top State
     * ==========================================
     */

    const stateMap={};

    salesRows.forEach(row=>{

        const state=

            String(

                row.state||""

            ).trim();

        if(!state){

            return;

        }

        if(!stateMap[state]){

            stateMap[state]={

                state,

                soldQty:0

            };

        }

        stateMap[state].soldQty+=

            Number(

                row.qty||0

            );

    });

    const topState=

        Object.values(

            stateMap

        )

        .sort(

            (a,b)=>

                b.soldQty-

                a.soldQty

        )[0]||

        null;

    /**
     * ==========================================
     * Return
     * ==========================================
     */

    return{

        totalStock,

        totalSale,

        sellThrough,

        topFC,

        topState

    };

}