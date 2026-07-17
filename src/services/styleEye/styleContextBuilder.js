/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Style Context Builder
 * Version : V2.0
 * =====================================================
 */

import { DataStore } from "../dataService.js";

import { LookupStore } from "../lookupService.js";

/**
 * =====================================================
 * Build Complete Style Context
 * =====================================================
 */

export function buildStyleContext(styleId){

    styleId = String(
        styleId || ""
    ).trim();

    const product = DataStore.productMaster.find(row=>{

        return String(
            row.style_id || ""
        ).trim()===styleId;

    });

    if(!product){

        return null;

    }

    return{

        identity:

            buildIdentity(product),

        pricing:

            buildPricing(product),

        sales:{},

        inventory:{},

        quality:{},

        performance:{},

        related:{},

        alerts:[],

        ai:{}

    };

}

/**
 * =====================================================
 * Identity
 * =====================================================
 */

function buildIdentity(product){

    const styleId =

        String(

            product.style_id || ""

        ).trim();

    const erpSku =

        String(

            product.erp_sku || ""

        ).trim();

    const listing =

        LookupStore.listingByStyleId[styleId] || {};

    const imageUrl =

        LookupStore.imageByStyleId[styleId]

        ||

        LookupStore.imageByErpSku[erpSku]

        ||

        "";

    const styleStatus =

        listing.styleStatus || "";

    const listingStatus =

        listing.listingStatus || "";

    const listingActive =

        String(

            listing.isActive || ""

        ).toUpperCase()==="TRUE"

        ||

        String(

            listing.isActive || ""

        ).toUpperCase()==="YES"

        ||

        String(

            listing.isActive || ""

        ).toUpperCase()==="ACTIVE";

    return{

        styleId:

            styleId,

        erpSku:

            erpSku,

        brand:

            product.brand || "",

        category:

            listing.styleName ||

            product.article_type ||

            "Saree",

        articleType:

            product.article_type || "",

        styleName:

            listing.styleName ||

            "Saree",

        erpStatus:

            product.status || "",

        styleStatus:

            styleStatus,

        listingStatus:

            listingStatus,

        listingActive:

            listingActive,

        imageUrl:

            imageUrl,

        launchDate:

            product.launch_date || "",

        liveDate:

            product.live_date || ""

    };

}

/**
 * =====================================================
 * Pricing
 * =====================================================
 */

function buildPricing(product){

    return{

        mrp:Number(

            product.mrp || 0

        ),

        tp:Number(

            product.tp || 0

        )

    };

}