/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Style Eye Overview Service
 * Version : V1.0
 * =====================================================
 */

import { DataStore } from "../dataService.js";

/**
 * =====================================================
 * Build Overview
 * =====================================================
 */

export function buildOverview(context){

    if(!context){

        return null;

    }

    const styleId = context.identity.styleId;

    const erpSku = context.identity.erpSku;

    // ==========================================
    // Sales
    // ==========================================

    const sales = DataStore.sales.filter(row=>

        String(row.style_id || "").trim() === styleId

    );

    // ==========================================
    // Current Month
    // ==========================================

    let latestMonth = "";

    let latestYear = "";

    sales.forEach(row=>{

        if(

            !latestYear ||

            Number(row.year) > Number(latestYear) ||

            (

                Number(row.year) === Number(latestYear)

                &&

                Number(row.month) > Number(latestMonth)

            )

        ){

            latestMonth = row.month;

            latestYear = row.year;

        }

    });

    // ==========================================
    // Sales
    // ==========================================

    const sales90 = sales.reduce(

        (sum,row)=>

            sum + Number(row.qty || 0),

        0

    );

    const currentMonthSales = sales

        .filter(row=>

            String(row.month)===String(latestMonth)

            &&

            String(row.year)===String(latestYear)

        )

        .reduce(

            (sum,row)=>

                sum + Number(row.qty || 0),

            0

        );

    // ==========================================
    // GMV
    // ==========================================

    const gmv90 = sales.reduce(

        (sum,row)=>

            sum + Number(row.final_amount || 0),

        0

    );

    const currentGMV = sales

        .filter(row=>

            String(row.month)===String(latestMonth)

            &&

            String(row.year)===String(latestYear)

        )

        .reduce(

            (sum,row)=>

                sum + Number(row.final_amount || 0),

            0

        );

    // ==========================================
    // Seller Stock
    // ==========================================

    const sellerStock =

        DataStore.sellerStock

        .filter(row=>

            String(

                row.erp_sku || ""

            ).trim()===erpSku

        )

        .reduce(

            (sum,row)=>

                sum +

                Number(

                    row.stock_units || 0

                ),

            0

        );

    // ==========================================
    // SJIT
    // ==========================================

    const sjitStock =

        DataStore.sjitStock

        .filter(row=>

            String(

                row.style_id || ""

            ).trim()===styleId

        )

        .reduce(

            (sum,row)=>

                sum +

                Number(

                    row.sellable_inventory_count || 0

                ),

            0

        );

    // ==========================================
    // SOR
    // ==========================================

    const sorStock =

        DataStore.sorStock

        .filter(row=>

            String(

                row.style_id || ""

            ).trim()===styleId

        )

        .reduce(

            (sum,row)=>

                sum +

                Number(

                    row.sellable_inventory_count || 0

                ),

            0

        );

    // ==========================================
    // DRR
    // ==========================================

    const drr =

        sales90 / 90;

    // ==========================================
    // Stock Cover
    // ==========================================

    const stockCover =

        drr===0

        ?

        0

        :

        (

            sellerStock +

            sjitStock +

            sorStock

        ) / drr;

    return{

        sales90,

        currentMonthSales,

        gmv90,

        currentGMV,

        sellerStock,

        sjitStock,

        sorStock,

        stockCover,

        drr

    };

}