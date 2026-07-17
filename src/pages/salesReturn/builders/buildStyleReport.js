/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Build Style Report
 * Version : V12.0
 * =====================================================
 */

export function buildStyleReport(

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

        const key = row.style_id || "-";

        if(!report[key]){

            report[key]=createRow(key);

        }

        const units = Number(row.qty)||0;

        const gmv = Number(row.final_amount)||0;

        report[key].saleGMV += gmv;

        report[key].saleUnits += units;

        if(

            String(row.order_status)

                .trim()

                .toUpperCase()==="F"

        ){

            report[key].cancelGMV += gmv;

            report[key].cancelUnits += units;

        }

    });

    /**
     * ==========================================
     * RETURNS
     * ==========================================
     */

    returns.forEach(row=>{

        const sale = lookup[row.order_line_id];

        if(!sale){

            return;

        }

        const key = sale.style_id || "-";

        const gmv = Number(sale.final_amount)||0;

        const type =

            String(row.type||"")

                .trim()

                .toUpperCase();

        if(type==="RTO"){

            report[key].rtoGMV += gmv;

            report[key].rtoUnits++;

        }

        else if(type==="RETURN"){

            report[key].cxGMV += gmv;

            report[key].cxUnits++;

        }

    });

    /**
     * ==========================================
     * NET
     * ==========================================
     */

    Object.values(report).forEach(item=>{

        item.netGMV =

            item.saleGMV

            -

            item.cancelGMV

            -

            item.rtoGMV

            -

            item.cxGMV;

        item.netUnits =

            item.saleUnits

            -

            item.cancelUnits

            -

            item.rtoUnits

            -

            item.cxUnits;

    });

    return Object.values(report)

        .sort(

            (a,b)=>b.saleGMV-a.saleGMV

        );

}

/**
 * =====================================================
 * Create Row
 * =====================================================
 */

function createRow(styleId){

    return{

        styleId,

        saleGMV:0,

        saleUnits:0,

        cancelGMV:0,

        cancelUnits:0,

        rtoGMV:0,

        rtoUnits:0,

        cxGMV:0,

        cxUnits:0,

        netGMV:0,

        netUnits:0

    };

}