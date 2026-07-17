/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Style Eye Search Service
 * Version : V2.0
 * =====================================================
 */

import { DataStore } from "../dataService.js";

import { LookupStore } from "../lookupService.js";

import { getListingStatus } from "./listingStatusService.js";

export function searchStyle(keyword){

    keyword = String(
        keyword || ""
    )
    .trim()
    .toUpperCase();

    if(!keyword){

        return{

            type:"EMPTY",

            results:[]

        };

    }

    // ==========================================
    // Exact Style ID
    // ==========================================

    const styleMatch = DataStore.productMaster.filter(row=>

        String(

            row.style_id || ""

        )

        .trim()

        .toUpperCase()

        ===

        keyword

    );

    if(styleMatch.length){

        return{

            type:"STYLE",

            results:styleMatch.map(buildResult)

        };

    }

    // ==========================================
    // Exact ERP SKU
    // ==========================================

    const erpMatch = DataStore.productMaster.filter(row=>

        String(

            row.erp_sku || ""

        )

        .trim()

        .toUpperCase()

        ===

        keyword

    );

    if(erpMatch.length===1){

        return{

            type:"STYLE",

            results:erpMatch.map(buildResult)

        };

    }

    if(erpMatch.length>1){

        return{

            type:"MULTIPLE",

            results:erpMatch.map(buildResult)

        };

    }

    return{

        type:"NOT_FOUND",

        results:[]

    };

}

/**
 * =====================================================
 * Build Search Result
 * =====================================================
 */

function buildResult(row){

    const styleId =

        String(

            row.style_id || ""

        ).trim();

    const erpSku =

        String(

            row.erp_sku || ""

        ).trim();

    const listing =

        LookupStore.listingByStyleId[styleId] || {};

    const listingStatus =

        getListingStatus(styleId);

    const traffic =

        DataStore.traffic.find(item=>

            String(

                item.style_id || ""

            ).trim()===styleId

        ) || {};

    return{

        styleId,

        erpSku,

        brand:

            row.brand || "",

        styleName:

            listing.styleName || "",

        category:

            listing.articleType ||

            row.article_type ||

            "Saree",

        erpStatus:

            row.status || "",

        styleStatus:

            listingStatus.styleStatus,

        listingStatus:

            listingStatus.listingStatus,

        overallStatus:

            listingStatus.overallStatus,

        badge:

            listingStatus.badge,

        isActive:

            listingStatus.isActive,

        imageUrl:

            LookupStore.imageByStyleId[styleId]

            ||

            LookupStore.imageByErpSku[erpSku]

            ||

            "",

        rating:

            Number(

                traffic.rating || 0

            ),

        launchDate:

            row.launch_date || "",

        launchAge:

            calculateLaunchAge(

                row.launch_date

            ),

        tp:

            Number(

                row.tp || 0

            ),

        mrp:

            Number(

                row.mrp || 0

            )

    };

}

/**
 * =====================================================
 * Launch Age
 * =====================================================
 */

function calculateLaunchAge(date){

    if(!date){

        return "-";

    }

    const launch =

        new Date(date);

    if(

        isNaN(

            launch.getTime()

        )

    ){

        return "-";

    }

    const diff =

        Date.now() -

        launch.getTime();

    return Math.floor(

        diff / 86400000

    ) + " Days";

}