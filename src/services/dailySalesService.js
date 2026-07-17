/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Daily Sales Service
 * Version : V1.1
 * =====================================================
 */

import { getReportRows } from "./reportHelper.js";

export function getDailySales(){

    const rows = getReportRows();

    const summary = {};

    rows.forEach(row=>{

        const day = Number(row.date);

        if(!summary[day]){

            summary[day]={

                date:day,

                total:0,

                gmv:0,

                PPMP:0,

                SJIT:0,

                SOR:0

            };

        }

        const qty = Number(row.qty || 0);

        const gmv = Number(row.final_amount || 0);

        summary[day].total += qty;

        summary[day].gmv += gmv;

        const poType = String(row.po_type || "").toUpperCase();

        if(summary[day][poType] !== undefined){

            summary[day][poType] += qty;

        }

        const brand = row.brand;

        if(!summary[day][brand]){

            summary[day][brand]=0;

        }

        summary[day][brand]+=qty;

    });

    const data = Object.values(summary)

        .sort((a,b)=>a.date-b.date);

    const total={

        date:"TOTAL",

        total:0,

        gmv:0,

        PPMP:0,

        SJIT:0,

        SOR:0

    };

    data.forEach(day=>{

        Object.keys(day).forEach(key=>{

            if(!total[key]){

                total[key]=0;

            }

            if(key==="date"){

                return;

            }

            total[key]+=Number(day[key]||0);

        });

    });

    data.push(total);

    return data;

}