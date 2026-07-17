/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Freshness Contribution Service
 * Version : V1.1
 * =====================================================
 */

import { getReportRows } from "./reportHelper.js";
import { DataStore } from "./dataService.js";

const BANDS = [
    { label:"0-30", min:0, max:30 },
    { label:"31-60", min:31, max:60 },
    { label:"61-90", min:61, max:90 },
    { label:"91-120", min:91, max:120 },
    { label:"121-180", min:121, max:180 },
    { label:">180", min:181, max:99999 }
];

export function getFreshnessContribution(){

    // Uses current selected period (30D/current month)
    const sales = getReportRows();

    const brands = [
        ...new Set(
            DataStore.productMaster
                .map(r=>r.brand)
                .filter(Boolean)
        )
    ].sort();

    const columns = [

        {
            key:"band",
            label:"Launch Age",
            align:"left"
        },

        {
            key:"launchStyles",
            label:"Launch Styles",
            align:"center",
            format:"number"
        },

        {
            key:"soldStyles",
            label:"Sold Styles",
            align:"center",
            format:"number"
        },

        {
            key:"qty",
            label:"Sold Qty",
            align:"center",
            format:"number"
        },

        {
            key:"share",
            label:"Share %",
            align:"center",
            renderer:v=>`${v.toFixed(1)}%`
        }

    ];

    brands.forEach(brand=>{

        columns.push({

            key:brand,

            label:brand,

            align:"center",

            renderer:v=>`${v.toFixed(1)}%`

        });

    });

    const totalSale = sales.reduce(
        (t,r)=>t+Number(r.qty||0),
        0
    );

    const brandSale={};

    brands.forEach(brand=>{

        brandSale[brand]=sales
            .filter(r=>r.brand===brand)
            .reduce(
                (t,r)=>t+Number(r.qty||0),
                0
            );

    });

    const rows=[];

    BANDS.forEach(band=>{

        const launchProducts = DataStore.productMaster.filter(product=>{

            const age = getLaunchAge(product);

            return age>=band.min && age<=band.max;

        });

        const styleIds = new Set(
            launchProducts.map(r=>String(r.style_id))
        );

        const bandSales = sales.filter(r=>
            styleIds.has(String(r.style_id))
        );

        const row={

            band:band.label,

            launchStyles:styleIds.size,

            soldStyles:new Set(
                bandSales.map(r=>r.style_id)
            ).size,

            qty:bandSales.reduce(
                (t,r)=>t+Number(r.qty||0),
                0
            ),

            share:0

        };

        row.share = totalSale
            ? (row.qty/totalSale)*100
            : 0;

        brands.forEach(brand=>{

            const qty = bandSales
                .filter(r=>r.brand===brand)
                .reduce(
                    (t,r)=>t+Number(r.qty||0),
                    0
                );

            row[brand]=brandSale[brand]
                ? (qty/brandSale[brand])*100
                :0;

        });

        rows.push(row);

    });

    rows.push({

        band:"Grand Total",

        launchStyles:DataStore.productMaster.length,

        soldStyles:new Set(
            sales.map(r=>r.style_id)
        ).size,

        qty:totalSale,

        share:100,

        ...Object.fromEntries(
            brands.map(b=>[b,100])
        )

    });

    return{

        columns,

        rows

    };

}

function getLaunchAge(product){

    const launch = new Date(
        Number(product.year),
        Number(product.month)-1,
        Number(product.date)
    );

    const today = new Date();

    return Math.floor(
        (today-launch)/86400000
    );

}