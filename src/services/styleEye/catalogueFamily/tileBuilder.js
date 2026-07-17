/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Catalogue Family Tile Builder
 * Version : V1.0
 * =====================================================
 */

import { buildStyleMetrics } from "../styleMetricsService.js";

import {

    normalize

} from "./helpers.js";

/**
 * =====================================================
 * Build Tiles
 * =====================================================
 */

export function buildTiles(

    products,

    currentStyle

){

    currentStyle = normalize(

        currentStyle

    );

    return products.map(product=>{

        const metrics =

            buildStyleMetrics(

                product.style_id

            );

        return{

            styleId:

                String(

                    product.style_id || ""

                ).trim(),

            erpSku:

                String(

                    product.erp_sku || ""

                ).trim(),

            brand:

                String(

                    product.brand || ""

                ).trim(),

            status:

                String(

                    product.status || ""

                ).trim(),

            rating:

                Number(

                    metrics.rating || 0

                ),

            sale90D:

                Number(

                    metrics.sale90D || 0

                ),

            customerReturnUnits:

                Number(

                    metrics.customerReturnUnits || 0

                ),

            customerReturnPercent:

                Number(

                    metrics.customerReturnPercent || 0

                ),

            rtoUnits:

                Number(

                    metrics.rtoUnits || 0

                ),

            rtoPercent:

                Number(

                    metrics.rtoPercent || 0

                ),

            sellerStock:

                Number(

                    metrics.sellerStock || 0

                ),

            sjitStock:

                Number(

                    metrics.sjitStock || 0

                ),

            sorStock:

                Number(

                    metrics.sorStock || 0

                ),

            totalStock:

                Number(

                    metrics.totalStock || 0

                ),

            imageUrl:

                "",

            isCurrent:

                normalize(

                    product.style_id

                )===currentStyle

        };

    });

}

/**
 * =====================================================
 * Limit Tiles
 *
 * Current Style
 * +
 * Maximum 9 More
 * =====================================================
 */

export function limitTiles(

    tiles,

    limit=10

){

    if(

        tiles.length<=limit

    ){

        return tiles;

    }

    const current=

        tiles.find(tile=>

            tile.isCurrent

        );

    const others=

        tiles.filter(tile=>

            !tile.isCurrent

        );

    others.sort((a,b)=>

        b.sale90D-a.sale90D

    );

    const result=[];

    if(current){

        result.push(

            current

        );

    }

    result.push(

        ...others.slice(

            0,

            limit-result.length

        )

    );

    return result;

}