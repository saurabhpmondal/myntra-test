/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Revenue Trend Service
 * Version : V1.1
 * =====================================================
 */

import { getTrendSales } from "./filterService.js";
import { getPeriodKey } from "./periodService.js";

export function getRevenueTrendData(){

    const rows = getTrendSales();

    const monthly = {};

    rows.forEach(row=>{

        const key = getPeriodKey(
            row.month,
            row.year
        );

        if(!monthly[key]){

            monthly[key]={

                period:key,

                label:`${row.month} ${row.year}`,

                revenue:0,

                units:0,

                saleDays:new Set()

            };

        }

        monthly[key].revenue +=
            Number(row.final_amount || 0);

        monthly[key].units +=
            Number(row.qty || 0);

        monthly[key].saleDays.add(
            Number(row.date)
        );

    });

    const data = Object.values(monthly)

        .sort((a,b)=>a.period-b.period)

        .map(item=>{

            const saleDays =
                item.saleDays.size;

            return{

                period:item.period,

                label:item.label,

                revenue:item.revenue,

                units:item.units,

                saleDays,

                revenueDRR:
                    saleDays
                        ? item.revenue/saleDays
                        :0,

                unitsDRR:
                    saleDays
                        ? item.units/saleDays
                        :0

            };

        });

    // ===============================
    // Summary KPIs
    // ===============================

    const highestRevenue =
        data.reduce((a,b)=>

            a.revenue>b.revenue?a:b,

            data[0]

        );

    const highestUnits =
        data.reduce((a,b)=>

            a.units>b.units?a:b,

            data[0]

        );

    return{

        data,

        summary:{

            highestRevenue,

            highestUnits,

            averageRevenueDRR:

                data.length

                    ? data.reduce(

                        (sum,row)=>

                            sum+row.revenueDRR,

                        0

                    )/data.length

                    :0,

            averageUnitsDRR:

                data.length

                    ? data.reduce(

                        (sum,row)=>

                            sum+row.unitsDRR,

                        0

                    )/data.length

                    :0

        }

    };

}