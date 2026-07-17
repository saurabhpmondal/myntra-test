/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Lookup Service
 * Version : V2.0
 * =====================================================
 */

import { DataStore } from "./dataService.js";

export const LookupStore = {

    /* ==========================================
       Product
    ========================================== */

    productMap:{},

    /* ==========================================
       Images
    ========================================== */

    imageByStyleId:{},

    imageByErpSku:{},

    /* ==========================================
       Listing Master
    ========================================== */

    listingByStyleId:{},

    /* ==========================================
       Filters
    ========================================== */

    brands:[],

    categories:[],

    erpStatuses:[]

};

/**
 * =====================================================
 * Build Lookups
 * =====================================================
 */

export function buildLookups(){

    const productMap={};

    const imageByStyleId={};

    const imageByErpSku={};

    const listingByStyleId={};

    const brands=new Set();

    const categories=new Set();

    const statuses=new Set();

console.log("Image Links", DataStore.imageLinks.length);

console.log("First Image Row", DataStore.imageLinks[0]);

console.log("Image Lookup", imageByStyleId["41120141"]);

    /* ==========================================
       Product Master
    ========================================== */

    DataStore.productMaster.forEach(product=>{

        const styleId=

            String(product.style_id || "").trim();

        const erpSku=

            String(product.erp_sku || "").trim();

        productMap[styleId]={

            styleId,

            erpSku,

            brand:product.brand || "",

            category:product.article_type || "",

            erpStatus:product.status || "",

            mrp:Number(product.mrp || 0),

            tp:Number(product.tp || 0),

            launchDate:product.launch_date || "",

            liveDate:product.live_date || ""

        };

        if(product.brand){

            brands.add(product.brand);

        }

        if(product.article_type){

            categories.add(product.article_type);

        }

        if(product.status){

            statuses.add(product.status);

        }

    });

    /* ==========================================
       Image Links
    ========================================== */

    DataStore.imageLinks.forEach(row=>{

        const styleId=

            String(row.style_id || "").trim();

        const erpSku=

            String(row.erp_sku || "").trim();

        const imageUrl=

            String(row.image_url || "").trim();

        if(styleId){

            imageByStyleId[styleId]=imageUrl;

        }

        if(erpSku){

            imageByErpSku[erpSku]=imageUrl;

        }

    });

    /* ==========================================
       Listing Master
    ========================================== */

    DataStore.listingMaster.forEach(row=>{

        const styleId=

            String(row.style_id || "").trim();

        if(!styleId){

            return;

        }

        listingByStyleId[styleId]={

            styleName:

                row.style_name || "",

            articleType:

                row.article_type || "",

            brand:

                row.brand || "",

            styleStatus:

                row.style_status_description || "",

            listingStatus:

                row.listing_status_description || "",

            isActive:

                String(

                    row.is_active || ""

                )

                .trim()

                .toUpperCase()

        };

    });

    /* ==========================================
       Save
    ========================================== */

    LookupStore.productMap=

        productMap;

    LookupStore.imageByStyleId=

        imageByStyleId;

    LookupStore.imageByErpSku=

        imageByErpSku;

    LookupStore.listingByStyleId=

        listingByStyleId;

    LookupStore.brands=

        [...brands].sort();

    LookupStore.categories=

        [...categories].sort();

    LookupStore.erpStatuses=

        [...statuses].sort();

    console.table({

        Products:

            Object.keys(productMap).length,

        Images:

            Object.keys(imageByStyleId).length,

        Listings:

            Object.keys(listingByStyleId).length,

        Brands:

            LookupStore.brands.length,

        Categories:

            LookupStore.categories.length,

        ERPStatus:

            LookupStore.erpStatuses.length

    });

}