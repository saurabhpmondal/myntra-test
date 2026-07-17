/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SOR Shipment Builder
 * Version : V1.0
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
    // Only KALINI & MITERA
    // ==========================================

    sales.forEach(row=>{

        const brand = String(
            row.brand || ""
        ).trim().toUpperCase();

        if(
            brand !== "KALINI" &&
            brand !== "MITERA"
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

        const brand = String(
            row.brand || ""
        ).trim().toUpperCase();

        if(
            brand !== "KALINI" &&
            brand !== "MITERA"
        ){
            return;
        }

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
    // SOR STOCK
    // ==========================================

    DataStore.sorStock.forEach(row=>{

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
            row.units || 0
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

    return Object.values(styles);

}

function getStyle(
    styles,
    styleId
){

    if(!styles[styleId]){

        styles[styleId] = {

            styleId,

            erpSku:"",

            erpStatus:"",

            brand:"",

            launchDate:"",

            rating:0,

            gross:0,

            returns:0,

            stock:0

        };

    }

    return styles[styleId];

}