/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Shipment Builder
 * Version : V5.2
 * =====================================================
 */

import { DataStore } from "../dataService.js";

export function buildShipmentData(
    sales,
    returns
){

    const styles = {};

    // ==========================================
    // SALES
    // ==========================================

    sales.forEach(row=>{

        const styleId = String(
            row.style_id || ""
        ).trim();

        if(!styleId){

            return;

        }

        const style = getStyle(
            styles,
            styleId
        );

        style.gross += Number(
            row.qty || 0
        );

        if(!style.brand){

            style.brand =
                row.brand || "";

        }

    });

    // ==========================================
    // RETURNS
    // Count ONLY Customer Returns
    // Ignore RTO
    // ==========================================

    returns.forEach(row=>{

        if(

            String(row.type || "")
                .trim()
                .toUpperCase() !== "RETURN"

        ){

            return;

        }

        const styleId = String(
            row.style_id || ""
        ).trim();

        if(!styleId){

            return;

        }

        const style = getStyle(
            styles,
            styleId
        );

        style.returns += 1;

    });

    // ==========================================
    // SJIT STOCK
    // ==========================================

    DataStore.sjitStock.forEach(row=>{

        const styleId = String(
            row.style_id || ""
        ).trim();

        if(!styleId){

            return;

        }

        const style = getStyle(
            styles,
            styleId
        );

        style.stock += Number(
            row.sellable_inventory_count || 0
        );

    });

    // ==========================================
    // PRODUCT MASTER
    // ==========================================

    DataStore.productMaster.forEach(row=>{

        const styleId = String(
            row.style_id || ""
        ).trim();

        if(!styleId){

            return;

        }

        const style = getStyle(
            styles,
            styleId
        );

        style.erpSku =
            row.erp_sku || "";

        style.erpStatus =
            row.status || "";

        style.launchDate =
            row.launch_date || "";

        if(!style.brand){

            style.brand =
                row.brand || "";

        }

    });

    // ==========================================
    // TRAFFIC
    // ==========================================

    DataStore.traffic.forEach(row=>{

        const styleId = String(
            row.style_id || ""
        ).trim();

        if(!styleId){

            return;

        }

        const style = getStyle(
            styles,
            styleId
        );

        style.rating = Number(
            row.rating || 0
        );

    });

    return Object.values(
        styles
    );

}

function getStyle(
    styles,
    styleId
){

    if(!styles[styleId]){

        styles[styleId] = {

            // Identity

            styleId,

            erpSku:"",

            erpStatus:"",

            brand:"",

            launchDate:"",

            rating:0,

            // Raw Metrics

            gross:0,

            returns:0,

            stock:0

        };

    }

    return styles[styleId];

}