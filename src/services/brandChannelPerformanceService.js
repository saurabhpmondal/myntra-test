/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Brand Channel Performance Service
 * Version : V2.0
 * =====================================================
 */

import { getFilteredSales } from "./filterService.js";
import { LookupStore } from "./lookupService.js";
import { DataStore } from "./dataService.js";

export function getBrandChannelPerformance(){

    const sales = getFilteredSales();

    const summary = {};

    let maxDay = 1;

    function getBrand(styleId){

        return LookupStore.productMap[styleId]?.brand || "Unknown";

    }

    function row(brand){

        if(!summary[brand]){

            summary[brand]={

                brand,

                stockSOR:0,
                stockSJIT:0,

                saleSOR:0,
                saleSJIT:0,
                salePPMP:0,

                totalSale:0,

                shareSOR:0,
                shareSJIT:0,
                sharePPMP:0,

                drrSOR:0,
                drrSJIT:0,
                drrPPMP:0

            };

        }

        return summary[brand];

    }

    // -------------------------
    // SALES
    // -------------------------

    sales.forEach(r=>{

        const brand = getBrand(r.style_id);

        const item = row(brand);

        const qty = Number(r.qty||0);

        const po = String(r.po_type).toUpperCase();

        maxDay = Math.max(
            maxDay,
            Number(r.date||1)
        );

        if(po==="SOR") item.saleSOR += qty;

        else if(po==="SJIT") item.saleSJIT += qty;

        else if(po==="PPMP") item.salePPMP += qty;

        item.totalSale += qty;

    });

    // -------------------------
    // SJIT STOCK
    // -------------------------

    DataStore.sjitStock.forEach(r=>{

        const brand = getBrand(r.style_id);

        row(brand).stockSJIT +=
            Number(r.sellable_inventory_count||0);

    });

    // -------------------------
    // SOR STOCK
    // -------------------------

    DataStore.sorStock.forEach(r=>{

        const brand = getBrand(r.style_id);

        row(brand).stockSOR +=
            Number(r.units||0);

    });

    // -------------------------
    // CALCULATIONS
    // -------------------------

    const data = Object.values(summary);

    data.forEach(r=>{

        if(r.totalSale){

            r.shareSOR =
                r.saleSOR*100/r.totalSale;

            r.shareSJIT =
                r.saleSJIT*100/r.totalSale;

            r.sharePPMP =
                r.salePPMP*100/r.totalSale;

        }

        r.drrSOR =
            r.saleSOR/maxDay;

        r.drrSJIT =
            r.saleSJIT/maxDay;

        r.drrPPMP =
            r.salePPMP/maxDay;

    });

    data.sort(

        (a,b)=>

        b.totalSale-a.totalSale

    );

    // -------------------------
    // GRAND TOTAL
    // -------------------------

    const total={

        brand:"TOTAL",

        stockSOR:0,
        stockSJIT:0,

        saleSOR:0,
        saleSJIT:0,
        salePPMP:0,

        totalSale:0,

        shareSOR:0,
        shareSJIT:0,
        sharePPMP:0,

        drrSOR:0,
        drrSJIT:0,
        drrPPMP:0

    };

    data.forEach(r=>{

        total.stockSOR+=r.stockSOR;
        total.stockSJIT+=r.stockSJIT;

        total.saleSOR+=r.saleSOR;
        total.saleSJIT+=r.saleSJIT;
        total.salePPMP+=r.salePPMP;

        total.totalSale+=r.totalSale;

    });

    if(total.totalSale){

        total.shareSOR=
            total.saleSOR*100/total.totalSale;

        total.shareSJIT=
            total.saleSJIT*100/total.totalSale;

        total.sharePPMP=
            total.salePPMP*100/total.totalSale;

    }

    total.drrSOR=total.saleSOR/maxDay;
    total.drrSJIT=total.saleSJIT/maxDay;
    total.drrPPMP=total.salePPMP/maxDay;

    data.push(total);

    return data;

}