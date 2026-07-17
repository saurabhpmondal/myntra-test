/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Sales Intelligence Service
 * Version : V1.0
 * =====================================================
 */

import { DataStore } from "../dataService.js";

export function buildSales(context){

    if(!context){

        return null;

    }

    const styleId = context.identity.styleId;

    const sales = DataStore.sales.filter(row=>

        String(row.style_id || "").trim()===styleId

    );

    const months = {};

    sales.forEach(row=>{

        const key = `${row.year}-${row.month}`;

        if(!months[key]){

            months[key]={

                month:row.month,

                year:row.year,

                units:0,

                gmv:0

            };

        }

        months[key].units += Number(row.qty || 0);

        months[key].gmv += Number(row.final_amount || 0);

    });

    const timeline = Object.values(months).sort((a,b)=>{

        if(a.year!==b.year){

            return Number(a.year)-Number(b.year);

        }

        return Number(a.month)-Number(b.month);

    });

    let peak=null;

    let lowest=null;

    timeline.forEach(item=>{

        if(!peak || item.units>peak.units){

            peak=item;

        }

        if(!lowest || item.units<lowest.units){

            lowest=item;

        }

    });

    const totalUnits = timeline.reduce(

        (sum,row)=>sum+row.units,

        0

    );

    const totalGMV = timeline.reduce(

        (sum,row)=>sum+row.gmv,

        0

    );

    const averageUnits =

        timeline.length

        ?

        totalUnits/timeline.length

        :

        0;

    const asp =

        totalUnits

        ?

        totalGMV/totalUnits

        :

        0;

    return{

        timeline,

        totalUnits,

        totalGMV,

        averageUnits,

        asp,

        peak,

        lowest

    };

}