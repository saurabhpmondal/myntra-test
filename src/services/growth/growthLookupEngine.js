/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Growth Lookup Engine
 * Version : V1.0
 * =====================================================
 */

import { DataStore } from "../dataService.js";

let productMap = {};
let ratingMap = {};

export function buildGrowthLookups(){

    productMap = {};

    ratingMap = {};

    // =====================================
    // Product Master
    // =====================================

    DataStore.productMaster.forEach(product=>{

        productMap[String(product.style_id)] = {

            erpSku:

                product.erpSku ||

                product.erp_sku ||

                "",

            status:

                product.erpStatus ||

                product.erp_status ||

                product.status ||

                ""

        };

    });

    // =====================================
    // Traffic Rating
    // =====================================

    DataStore.traffic.forEach(item=>{

        ratingMap[String(item.style_id)] =

            Number(item.rating || 0);

    });

}

export function getLookup(styleId){

    const product =

        productMap[String(styleId)] ||

        {};

    return{

        erpSku:

            product.erpSku ||

            "",

        status:

            product.status ||

            "",

        rating:

            ratingMap[String(styleId)] ||

            0

    };

}

export function getERP(styleId){

    return getLookup(styleId).erpSku;

}

export function getStatus(styleId){

    return getLookup(styleId).status;

}

export function getRating(styleId){

    return getLookup(styleId).rating;

}