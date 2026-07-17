/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : KPI Engine
 * Version : V12.0
 * =====================================================
 */

export function buildKPIs(

    sales=[],

    returns=[],

    lookup={}

){

    const kpi={

        sale:{gmv:0,units:0},

        cancel:{gmv:0,units:0},

        rto:{gmv:0,units:0},

        cx:{gmv:0,units:0},

        net:{gmv:0,units:0}

    };

    /**
     * ==========================================
     * Sales + Cancel
     * ==========================================
     */

    sales.forEach(row=>{

        const units=

            Number(row.qty)||0;

        const gmv=

            Number(row.final_amount)||0;

        kpi.sale.units+=units;

        kpi.sale.gmv+=gmv;

        if(

            String(

                row.order_status

            ).toUpperCase()==="F"

        ){

            kpi.cancel.units+=units;

            kpi.cancel.gmv+=gmv;

        }

    });

    /**
     * ==========================================
     * Returns
     * ==========================================
     */

    returns.forEach(row=>{

        const order=

            lookup[

                row.order_line_id

            ];

        const gmv=

            order

            ?

            Number(

                order.final_amount

            )||0

            :

            0;

        const type=

            String(

                row.type||""

            )

            .trim()

            .toUpperCase();

        if(type==="RTO"){

            kpi.rto.units++;

            kpi.rto.gmv+=gmv;

        }

        else if(type==="RETURN"){

            kpi.cx.units++;

            kpi.cx.gmv+=gmv;

        }

    });

    /**
     * ==========================================
     * Net
     * ==========================================
     */

    kpi.net.units=

        kpi.sale.units

        -

        kpi.cancel.units

        -

        kpi.rto.units

        -

        kpi.cx.units;

    kpi.net.gmv=

        kpi.sale.gmv

        -

        kpi.cancel.gmv

        -

        kpi.rto.gmv

        -

        kpi.cx.gmv;

    return kpi;

}