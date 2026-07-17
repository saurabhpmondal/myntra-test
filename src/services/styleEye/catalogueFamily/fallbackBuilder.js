/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Catalogue Family Fallback Builder
 * Version : V1.0
 * =====================================================
 */

import { buildStyleMetrics } from "../styleMetricsService.js";

import {

    sortBySale,
    normalize

} from "./helpers.js";

/**
 * =====================================================
 * Build Brand Fallback
 *
 * Returns Top 5 Best Selling Styles
 * of the same Brand.
 * =====================================================
 */

export function buildFallbackProducts(

    products,

    currentStyle

){

    currentStyle = normalize(

        currentStyle

    );

    const styles =

        products.map(product=>{

            const metrics =

                buildStyleMetrics(

                    product.style_id

                );

            return{

                ...product,

                sale90D:

                    metrics.sale90D,

                rating:

                    metrics.rating,

                customerReturn:

                    metrics.customerReturnPercent,

                rto:

                    metrics.rtoPercent,

                totalStock:

                    metrics.totalStock

            };

        });

    styles.sort(

        sortBySale

    );

    const current =

        styles.find(style=>

            normalize(

                style.style_id

            )===currentStyle

        );

    const others =

        styles.filter(style=>

            normalize(

                style.style_id

            )!==currentStyle

        );

    const result = [];

    if(current){

        result.push(

            current

        );

    }

    result.push(

        ...others.slice(

            0,

            5

        )

    );

    return result;

}

/**
 * =====================================================
 * Is Fallback Required
 * =====================================================
 */

export function shouldUseFallback(

    familyProducts

){

    return (

        !familyProducts ||

        familyProducts.length<=1

    );

}