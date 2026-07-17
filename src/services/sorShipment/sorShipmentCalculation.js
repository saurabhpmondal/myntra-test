/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Shipment Calculation Engine
 * Version : V5.1
 * =====================================================
 */

export function calculateShipmentData(

    rows,

    config

){

    return rows.map(row=>{

        const gross = Number(

            row.gross || 0

        );

        const returns = Number(

            row.returns || 0

        );

        const stock = Number(

            row.stock || 0

        );

        // =====================================
        // Net Sale
        // =====================================

        const net = Math.max(

            0,

            gross - returns

        );

        // =====================================
        // Return %
        // =====================================

        const returnPercent =

            gross === 0

            ?

            0

            :

            (returns / gross) * 100;

        // =====================================
        // DRR
        // =====================================

        const drr =

            net === 0

            ?

            0

            :

            net / config.saleDays;

        // =====================================
        // Stock Cover
        // =====================================

        const sc =

            drr === 0

            ?

            0

            :

            stock / drr;

        // =====================================
        // Projection
        // =====================================

        const projection = Math.max(

            0,

            Math.round(

                (drr * config.targetCover)

                -

                stock

            )

        );

        return{

            ...row,

            gross,

            returns,

            net,

            returnPercent,

            drr,

            stock,

            sc,

            projection,

            shipment:0,

            recall:0,

            remark:""

        };

    });

}