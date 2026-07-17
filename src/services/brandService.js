/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Brand Service
 * Version : V1.0
 * =====================================================
 */

import { getFilteredSales } from "./filterService.js";

export function getBrandPerformance(){

    const rows = getFilteredSales();

    const summary = {};

    let totalUnits = 0;

    let totalGMV = 0;

    rows.forEach(row=>{

        const brand = row.brand || "Unknown";

        if(!summary[brand]){

            summary[brand]={

                brand,

                units:0,

                gmv:0

            };

        }

        const units = Number(row.qty || 0);

        const gmv = Number(row.final_amount || 0);

        summary[brand].units += units;

        summary[brand].gmv += gmv;

        totalUnits += units;

        totalGMV += gmv;

    });

    return Object.values(summary)

        .map(item=>({

            brand:item.brand,

            units:item.units,

            gmv:item.gmv,

            asp:item.units===0
                ?0
                :item.gmv/item.units,

            gmvShare:totalGMV===0
                ?0
                :(item.gmv/totalGMV)*100,

            unitShare:totalUnits===0
                ?0
                :(item.units/totalUnits)*100

        }))

        .sort((a,b)=>b.gmv-a.gmv);

}