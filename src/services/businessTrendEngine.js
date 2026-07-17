/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Business Trend Engine
 * Version : V1.0
 * =====================================================
 */

import { getTrendSales } from "./filterService.js";
import { projectMetric } from "./projectionService.js";
import { getPeriodKey } from "./periodService.js";

export function getBusinessTrend(){

    const sales = getTrendSales();

    const periodMap = {};
    const brandSet = new Set();

    sales.forEach(row=>{

        const key = getPeriodKey(row.month,row.year);

        if(!periodMap[key]){

            periodMap[key]={

                key,

                month:row.month,

                year:Number(row.year),

                rows:[]

            };

        }

        periodMap[key].rows.push(row);

        brandSet.add(row.brand || "Unknown");

    });

    const periods = Object.values(periodMap)

        .sort((a,b)=>a.key-b.key);

    const latest = periods.at(-1);

    const previous = periods.at(-2);

    const history = periods.slice(-6);

    const brands=[...brandSet];

    // ------------------------------------
    // Brand Sort
    // ------------------------------------

    brands.sort((a,b)=>{

        const pa = projectMetric(

            latest.rows.filter(r=>r.brand===a),

            "qty"

        ).projected;

        const pb = projectMetric(

            latest.rows.filter(r=>r.brand===b),

            "qty"

        ).projected;

        return pb-pa;

    });

    const result={

        brands,

        history:[],

        currentMonth:

            latest.month,

        previousMonth:

            previous?.month || "",

        mtd:{},

        projected:{},

        drr:{},

        previous:{},

        growth:{},

        contribution:{}

    };

    // ------------------------------------
    // History
    // ------------------------------------

    history.forEach(period=>{

        const row={

            label:

                `${short(period.month)}-${String(period.year).slice(2)}`,

            total:0,

            brands:{}

        };

        brands.forEach(brand=>{

            const qty=sum(

                period.rows.filter(r=>r.brand===brand),

                "qty"

            );

            row.brands[brand]=qty;

            row.total+=qty;

        });

        result.history.push(row);

    });

    // ------------------------------------
    // Latest
    // ------------------------------------

    brands.forEach(brand=>{

        const currentRows = latest.rows.filter(

            r=>r.brand===brand

        );

        const metric = projectMetric(

            currentRows,

            "qty"

        );

        result.mtd[brand]=metric.actual;

        result.projected[brand]=metric.projected;

        result.drr[brand]=Math.round(metric.drr);

        result.previous[brand]=

            previous

                ? sum(

                    previous.rows.filter(

                        r=>r.brand===brand

                    ),

                    "qty"

                )

                :0;

    });

    // ------------------------------------
    // Totals
    // ------------------------------------

    const totalProjection =

        Object.values(result.projected)

            .reduce((a,b)=>a+b,0);

    brands.forEach(brand=>{

        const previousSale=

            result.previous[brand];

        const projection=

            result.projected[brand];

        result.growth[brand]=

            previousSale===0

                ?0

                :((projection-previousSale)

                    /previousSale)*100;

        result.contribution[brand]=

            totalProjection===0

                ?0

                :(projection

                    /totalProjection)*100;

    });

    return result;

}

function sum(rows,column){

    return rows.reduce(

        (t,r)=>

            t+Number(r[column]||0),

        0

    );

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