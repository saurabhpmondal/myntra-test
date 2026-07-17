/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Build Return Reason Report
 * Version : V12.1
 * =====================================================
 */

export function buildReturnReasonReport(

    sales=[],

    returns=[],

    lookup={}

){

    const report={};

    let totalReturnUnits=0;

    returns.forEach(row=>{

        const sale=

            lookup[

                row.order_line_id

            ];

        if(!sale){

            return;

        }

        /**
         * ------------------------------------------
         * RTO has no reason.
         * Show "RTO" instead of Unknown.
         * ------------------------------------------
         */

        let reason=

            String(

                row.return_reason||""

            ).trim();

        const type=

            String(

                row.type||""

            )

            .trim()

            .toUpperCase();

        if(type==="RTO"){

            reason="RTO";

        }

        if(!reason){

            reason="Unknown";

        }

        if(!report[reason]){

            report[reason]={

                returnReason:reason,

                returnGMV:0,

                returnUnits:0,

                contribution:0

            };

        }

        const gmv=

            Number(

                sale.final_amount

            )||0;

        report[reason].returnGMV+=gmv;

        report[reason].returnUnits++;

        totalReturnUnits++;

    });

    Object.values(report).forEach(item=>{

        item.contribution=

            totalReturnUnits

                ?

                (

                    item.returnUnits

                    /

                    totalReturnUnits

                )*100

                :

                0;

    });

    return Object.values(report)

        .sort(

            (a,b)=>

                b.returnUnits-

                a.returnUnits

        );

}