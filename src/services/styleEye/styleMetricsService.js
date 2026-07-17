/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Style Metrics Service
 * Version : V2.0
 * =====================================================
 */

import { DataStore } from "../dataService.js";

/**
 * =====================================================
 * Build Style Metrics
 * =====================================================
 */

export function buildStyleMetrics(styleId){

    styleId = String(styleId || "").trim();

    // =================================================
    // Product Master
    // =================================================

    const product =

        DataStore.productMaster.find(row=>

            String(row.style_id || "").trim()===styleId

        ) || {};

    const erpSku =

        String(product.erp_sku || "").trim();

    // =================================================
    // Sales
    // =================================================

    const sales =

        DataStore.sales.filter(row=>

            String(row.style_id || "").trim()===styleId

        );

    const sale90D =

        sales.reduce(

            (sum,row)=>

                sum+

                Number(row.qty || 0),

            0

        );

    const salesValue =

        sales.reduce(

            (sum,row)=>

                sum+

                Number(row.final_amount || 0),

            0

        );

    // =================================================
    // Traffic
    // =================================================

    const traffic =

        DataStore.traffic.find(row=>

            String(row.style_id || "").trim()===styleId

        ) || {};

    const rating =

        Number(

            traffic.rating || 0

        );

    // =================================================
    // Returns
    // =================================================

    const returns =

        DataStore.returns.filter(row=>

            String(row.style_id || "").trim()===styleId

        );

    const customerReturnUnits =

        returns.filter(row=>

            String(row.type || "")

            .toUpperCase()==="RETURN"

        ).length;

    const rtoUnits =

        returns.filter(row=>

            String(row.type || "")

            .toUpperCase()==="RTO"

        ).length;

    const totalReturnUnits =

        customerReturnUnits +

        rtoUnits;

    const customerReturnPercent =

        sale90D===0

        ?0

        :(customerReturnUnits/sale90D)*100;

    const rtoPercent =

        sale90D===0

        ?0

        :(rtoUnits/sale90D)*100;

    const totalReturnPercent =

        sale90D===0

        ?0

        :(totalReturnUnits/sale90D)*100;

    // =================================================
    // Seller Stock
    // Uses ERP SKU
    // =================================================

    const sellerStock =

        DataStore.sellerStock

        .filter(row=>

            String(row.erp_sku || "").trim()===erpSku

        )

        .reduce(

            (sum,row)=>

                sum+

                Number(row.units || 0),

            0

        );

    // =================================================
    // SJIT Stock
    // =================================================

    const sjitStock =

        DataStore.sjitStock

        .filter(row=>

            String(row.style_id || "").trim()===styleId

        )

        .reduce(

            (sum,row)=>

                sum+

                Number(

                    row.sellable_inventory_count || 0

                ),

            0

        );

    // =================================================
    // SOR Stock
    // =================================================

    const sorStock =

        DataStore.sorStock

        .filter(row=>

            String(row.style_id || "").trim()===styleId

        )

        .reduce(

            (sum,row)=>

                sum+

                Number(row.units || 0),

            0

        );

    // =================================================
    // Inventory
    // =================================================

    const totalStock =

        sellerStock +

        sjitStock +

        sorStock;

    const drr =

        sale90D/90;

    const stockCover =

        drr===0

        ?0

        :totalStock/drr;

    // =================================================
    // Return
    // =================================================

    return{

        // Identity

        styleId,

        erpSku,

        // Sales

        sale90D,

        salesValue,

        // Traffic

        rating,

        // Returns

        customerReturnUnits,

        customerReturnPercent,

        rtoUnits,

        rtoPercent,

        totalReturnUnits,

        totalReturnPercent,

        // Inventory

        sellerStock,

        sjitStock,

        sorStock,

        totalStock,

        // Performance

        drr,

        stockCover

    };

}