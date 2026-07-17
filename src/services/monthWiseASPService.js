/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Month Wise ASP Service
 * Version : V1.0
 * =====================================================
 */

import { getTrendSales } from "./filterService.js";
import { getPeriodKey } from "./periodService.js";

export function getMonthWiseASP(){

    const sales = getTrendSales();

    const periodMap = {};
    const brandSet = new Set();

    sales.forEach(row=>{

        const key = getPeriodKey(row.month,row.year);

        if(!periodMap[key]){

            periodMap[key]={

                month:row.month,

                year:row.year,

                rows:[]

            };

        }

        periodMap[key].rows.push(row);

        brandSet.add(row.brand || "Unknown");

    });

    const periods = Object.values(periodMap)

        .sort((a,b)=>

            getPeriodKey(a.month,a.year) -

            getPeriodKey(b.month,b.year)

        )

        .slice(-6);

    const brands = [...brandSet].sort();

    const columns=[

        {

            key:"month",

            label:"Month",

            align:"left"

        }

    ];

    brands.forEach(brand=>{

        columns.push({

            key:brand,

            label:brand,

            align:"center",

            renderer:value=>

                value===0

                    ? "-"

                    : "₹"+Number(value).toFixed(0)

        });

    });

    const rows=[];

    periods.forEach(period=>{

        const row={

            month:`${short(period.month)}-${String(period.year).slice(2)}`

        };

        brands.forEach(brand=>{

            const brandRows = period.rows.filter(

                r=>(r.brand||"Unknown")===brand

            );

            const qty = brandRows.reduce(

                (t,r)=>

                    t+Number(r.qty||0),

                0

            );

            const gmv = brandRows.reduce(

                (t,r)=>

                    t+Number(r.final_amount||0),

                0

            );

            row[brand]=

                qty===0

                    ?0

                    :gmv/qty;

        });

        rows.push(row);

    });

    return{

        columns,

        rows

    };

}

function short(month){

    return{

        JAN:"Jan",

        FEB:"Feb",

        MAR:"Mar",

        APR:"Apr",

        MAY:"May",

        JUNE:"Jun",

        JULY:"Jul",

        AUG:"Aug",

        SEP:"Sep",

        OCT:"Oct",

        NOV:"Nov",

        DEC:"Dec"

    }[String(month).toUpperCase()]||month;

}