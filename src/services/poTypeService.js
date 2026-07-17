/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : PO Type Service
 * Version : V1.0
 * =====================================================
 */

import { getFilteredSales } from "./filterService.js";

export function getPOTypePerformance(){

    const rows = getFilteredSales();

    const summary = {};

    let totalUnits = 0;

    let totalGMV = 0;

    rows.forEach(row=>{

        const poType = row.po_type || "Unknown";

        if(!summary[poType]){

            summary[poType]={

                poType,

                units:0,

                gmv:0

            };

        }

        const units = Number(row.qty || 0);

        const gmv = Number(row.final_amount || 0);

        summary[poType].units += units;

        summary[poType].gmv += gmv;

        totalUnits += units;

        totalGMV += gmv;

    });

    return Object.values(summary)

        .map(item=>({

            poType:item.poType,

            units:item.units,

            gmv:item.gmv,

            asp:item.units===0 ? 0 : item.gmv/item.units,

            gmvShare:totalGMV===0
                ?0
                :(item.gmv/totalGMV)*100,

            unitShare:totalUnits===0
                ?0
                :(item.units/totalUnits)*100

        }))

        .sort((a,b)=>b.gmv-a.gmv);

}