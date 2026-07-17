/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Catalogue Finder
 * Version : V2.0
 * =====================================================
 */

import { DataStore } from "../../dataService.js";

import {

    getCatalogueId,
    normalize

} from "./helpers.js";

/**
 * =====================================================
 * Find Catalogue Family
 * =====================================================
 */

export function findCatalogueFamily(

    styleId

){

    styleId = normalize(

        styleId

    );

    const currentProduct =

        DataStore.productMaster.find(product=>

            normalize(

                product.style_id

            )===styleId

        );

    if(!currentProduct){

        return{

            found:false,

            catalogueId:"",
            currentProduct:null,
            family:[]

        };

    }

    const catalogueId =

        getCatalogueId(

            currentProduct.erp_sku

        );

    // ==========================================
    // Build Family
    // ==========================================

    const familyMap = new Map();

    DataStore.productMaster.forEach(product=>{

        const productCatalogue =

            getCatalogueId(

                product.erp_sku

            );

        if(

            productCatalogue===catalogueId

        ){

            familyMap.set(

                normalize(

                    product.style_id

                ),

                product

            );

        }

    });

    const family =

        Array.from(

            familyMap.values()

        )

        .sort((a,b)=>{

            return String(

                a.erp_sku || ""

            ).localeCompare(

                String(

                    b.erp_sku || ""

                ),

                undefined,

                {

                    numeric:true,

                    sensitivity:"base"

                }

            );

        });

    return{

        found:

            family.length>1,

        catalogueId,

        currentProduct,

        family

    };

}

/**
 * =====================================================
 * Find Same Brand Products
 * Used when no catalogue family exists
 * =====================================================
 */

export function findBrandProducts(

    brand

){

    brand = normalize(

        brand

    );

    return DataStore.productMaster

        .filter(product=>

            normalize(

                product.brand

            )===brand

        );

}

/**
 * =====================================================
 * Get Current Product
 * =====================================================
 */

export function getCurrentProduct(

    styleId

){

    styleId = normalize(

        styleId

    );

    return DataStore.productMaster.find(product=>

        normalize(

            product.style_id

        )===styleId

    ) || null;

}