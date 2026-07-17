/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Inventory Intelligence Service
 * Version : V2.0
 * =====================================================
 */

import { DataStore } from "../dataService.js";

export function buildInventory(context){

    if(!context){

        return null;

    }

    const styleId = context.identity.styleId;

    const erpSku = context.identity.erpSku;

    // ==========================================
    // Seller Stock
    // ==========================================

    const sellerStock = DataStore.sellerStock
        .filter(row=>
            String(row.erp_sku || "").trim()===erpSku
        )
        .reduce(
            (sum,row)=>
                sum + Number(row.stock_units || 0),
            0
        );

    // ==========================================
    // SJIT Stock
    // ==========================================

    const sjitStock = DataStore.sjitStock
        .filter(row=>
            String(row.style_id || "").trim()===styleId
        )
        .reduce(
            (sum,row)=>
                sum + Number(row.sellable_inventory_count || 0),
            0
        );

    // ==========================================
    // SOR Stock
    // ==========================================

    const sorStock = DataStore.sorStock
        .filter(row=>
            String(row.style_id || "").trim()===styleId
        )
        .reduce(
            (sum,row)=>
                sum + Number(row.sellable_inventory_count || 0),
            0
        );

    // ==========================================
    // Total Stock
    // ==========================================

    const totalStock =
        sellerStock +
        sjitStock +
        sorStock;

    // ==========================================
    // Sales
    // ==========================================

    const totalSale = DataStore.sales
        .filter(row=>
            String(row.style_id || "").trim()===styleId
        )
        .reduce(
            (sum,row)=>
                sum + Number(row.qty || 0),
            0
        );

    // ==========================================
    // DRR
    // ==========================================

    const drr = totalSale / 90;

    // ==========================================
    // Stock Cover
    // ==========================================

    const stockCover =
        drr === 0
        ? 0
        : totalStock / drr;

    // ==========================================
    // Health
    // ==========================================

    const health =
        buildHealth(stockCover);

    // ==========================================
    // Action
    // ==========================================

    const action =
        buildAction(
            stockCover,
            drr,
            totalStock
        );

    return{

        snapshot:{

            sellerStock,

            sjitStock,

            sorStock,

            totalStock,

            totalSale,

            drr,

            stockCover

        },

        health,

        action

    };

}

/**
 * =====================================================
 * Inventory Health
 * =====================================================
 */

function buildHealth(stockCover){

    if(stockCover===0){

        return{

            status:"No Stock",

            color:"danger",

            icon:"🔴",

            idealRange:"30 - 90 Days",

            description:

                "No inventory available for sale."

        };

    }

    if(stockCover<=30){

        return{

            status:"Low Stock",

            color:"warning",

            icon:"🟠",

            idealRange:"30 - 90 Days",

            description:

                "Inventory may run out soon."

        };

    }

    if(stockCover<=90){

        return{

            status:"Healthy",

            color:"success",

            icon:"🟢",

            idealRange:"30 - 90 Days",

            description:

                "Inventory is within the ideal stock range."

        };

    }

    if(stockCover<=180){

        return{

            status:"Overstock",

            color:"info",

            icon:"🟡",

            idealRange:"30 - 90 Days",

            description:

                "Inventory is higher than recommended."

        };

    }

    return{

        status:"Dead Stock",

        color:"danger",

        icon:"🔴",

        idealRange:"30 - 90 Days",

        description:

            "Inventory is significantly overstocked."

    };

}

/**
 * =====================================================
 * Business Action
 * =====================================================
 */

function buildAction(

    stockCover,

    drr,

    totalStock

){

    if(stockCover<=30){

        const qty = Math.max(

            0,

            Math.ceil(

                (45 * drr) -

                totalStock

            )

        );

        return{

            type:"SHIPMENT",

            title:"Shipment Required",

            icon:"📦",

            priority:"HIGH",

            quantity:qty,

            targetCover:45,

            expectedCover:45,

            description:

                "Current stock cover is below the recommended level."

        };

    }

    if(stockCover>180){

        const qty = Math.max(

            0,

            Math.ceil(

                totalStock -

                (90 * drr)

            )

        );

        return{

            type:"RECALL",

            title:"Recall Required",

            icon:"⚠",

            priority:"HIGH",

            quantity:qty,

            targetCover:90,

            expectedCover:90,

            description:

                "Inventory is significantly overstocked."

        };

    }

    if(stockCover>90){

        return{

            type:"MONITOR",

            title:"Monitor Inventory",

            icon:"👀",

            priority:"LOW",

            quantity:0,

            targetCover:90,

            expectedCover:90,

            description:

                "Inventory is above the ideal range but recall is not yet required."

        };

    }

    return{

        type:"BALANCED",

        title:"Inventory Balanced",

        icon:"✅",

        priority:"NONE",

        quantity:0,

        targetCover:45,

        expectedCover:Math.round(stockCover),

        description:

            "No business action is required."

    };

}