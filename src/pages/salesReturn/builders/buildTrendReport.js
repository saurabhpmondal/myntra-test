/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Build Trend Report
 * Version : V12.0
 * =====================================================
 */

import {

    getPeriodKey,
    getPeriodLabel

} from "../../../services/periodService.js";

export function buildTrendReport(

    sales=[],

    returns=[],

    lookup={}

){

    const report={};

    /**
     * ==========================================
     * SALES
     * ==========================================
     */

    sales.forEach(row=>{

        const periodKey=

            getPeriodKey(

                row.month,

                row.year

            );

        if(!report[periodKey]){

            report[periodKey]=createRow(

                periodKey,

                row.month,

                row.year

            );

        }

        const item=

            report[periodKey];

        const units=

            Number(row.qty)||0;

        const gmv=

            Number(row.final_amount)||0;

        item.saleGMV+=gmv;

        item.saleUnits+=units;

        if(

            String(

                row.order_status

            )

            .trim()

            .toUpperCase()==="F"

        ){

            item.cancelGMV+=gmv;

            item.cancelUnits+=units;

        }

    });

    /**
     * ==========================================
     * RETURNS
     * ==========================================
     */

    returns.forEach(row=>{

        const sale=

            lookup[

                row.order_line_id

            ];

        if(!sale){

            return;

        }

        const periodKey=

            getPeriodKey(

                row.month,

                row.year

            );

        if(!report[periodKey]){

            report[periodKey]=createRow(

                periodKey,

                row.month,

                row.year

            );

        }

        const item=

            report[periodKey];

        const gmv=

            Number(

                sale.final_amount

            )||0;

        const type=

            String(

                row.type||""

            )

            .trim()

            .toUpperCase();

        if(type==="RTO"){

            item.rtoGMV+=gmv;

            item.rtoUnits++;

        }

        else if(type==="RETURN"){

            item.cxGMV+=gmv;

            item.cxUnits++;

        }

    });

    /**
     * ==========================================
     * NET
     * ==========================================
     */

    Object.values(report).forEach(item=>{

        item.netGMV=

            item.saleGMV

            -

            item.cancelGMV

            -

            item.rtoGMV

            -

            item.cxGMV;

        item.netUnits=

            item.saleUnits

            -

            item.cancelUnits

            -

            item.rtoUnits

            -

            item.cxUnits;

        item.returnPct=

            item.saleUnits

            ?

            (

                (

                    item.rtoUnits+

                    item.cxUnits

                )

                /

                item.saleUnits

            )*100

            :

            0;

    });

    return Object.values(report)

        .sort(

            (a,b)=>

                a.periodKey-

                b.periodKey

        );

}

/**
 * =====================================================
 * Create Row
 * =====================================================
 */

function createRow(

    periodKey,

    month,

    year

){

    return{

        periodKey,

        period:

            getPeriodLabel(

                month,

                year

            ),

        saleGMV:0,

        saleUnits:0,

        cancelGMV:0,

        cancelUnits:0,

        rtoGMV:0,

        rtoUnits:0,

        cxGMV:0,

        cxUnits:0,

        netGMV:0,

        netUnits:0,

        returnPct:0

    };

}