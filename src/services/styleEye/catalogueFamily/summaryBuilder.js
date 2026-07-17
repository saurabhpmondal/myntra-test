/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Catalogue Family Summary Builder
 * Version : V1.0
 * =====================================================
 */

import { buildStyleMetrics } from "../styleMetricsService.js";

/**
 * =====================================================
 * Build Summary
 * =====================================================
 */

export function buildSummary(

    catalogueId,

    products

){

    const summary={

        catalogueId,

        styleCount:0,

        active:0,

        inactive:0,

        totalSale:0,

        avgRating:0

    };

    if(

        !products ||

        !products.length

    ){

        return summary;

    }

    let ratingTotal=0;

    products.forEach(product=>{

        const metrics=

            buildStyleMetrics(

                product.style_id

            );

        summary.styleCount++;

        summary.totalSale+=

            metrics.sale90D;

        ratingTotal+=

            metrics.rating;

        if(

            String(

                product.status || ""

            )

            .trim()

            .toUpperCase()==="CONTINUE"

        ){

            summary.active++;

        }

        else{

            summary.inactive++;

        }

    });

    summary.avgRating=

        summary.styleCount

        ?

        ratingTotal/

        summary.styleCount

        :

        0;

    return summary;

}

/**
 * =====================================================
 * Build Header
 * =====================================================
 */

export function buildHeader(

    mode,

    catalogueId,

    brand

){

    if(

        mode==="FAMILY"

    ){

        return{

            mode,

            title:

                "📦 Catalogue Family",

            subtitle:

                `Catalogue : ${catalogueId}`

        };

    }

    return{

        mode,

        title:

            "⭐ Top Selling Styles",

        subtitle:

            `Top 5 Selling Styles • ${brand}`

    };

}