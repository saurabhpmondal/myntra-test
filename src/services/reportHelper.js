/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Report Helper
 * Version : V1.0
 * =====================================================
 */

import { getFilteredSales } from "./filterService.js";
import { LookupStore } from "./lookupService.js";

export function getReportRows(){

    return getFilteredSales().map(sale=>{

        const product =

            LookupStore.productMap[sale.style_id] || {};

        return{

            ...sale,

            brand:

                product.brand ||

                sale.brand ||

                "Unknown",

            category:

                product.category ||

                "",

            erpStatus:

                product.erpStatus ||

                "",

            erpSku:

                product.erpSku ||

                ""

        };

    });

}