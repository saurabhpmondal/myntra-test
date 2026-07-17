/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Brand Performance
 * Version : V1.0
 * =====================================================
 */

import { renderTable } from "../../common/table/table.js";
import { getBrandPerformance } from "../../../services/brandService.js";

export async function renderBrandPerformance(target){

    const data = getBrandPerformance();

    await renderTable({

        target,

        title:"Brand Wise Sales Share",

        subtitle:"Current Month Performance",

        columns:[

            {
                key:"brand",
                label:"Brand"
            },

            {
                key:"units",
                label:"Units Sold",
                format:"number"
            },

            {
                key:"gmv",
                label:"GMV",
                format:"compactCurrency"
            },

            {
                key:"asp",
                label:"ASP",
                format:"currency"
            },

            {
                key:"gmvShare",
                label:"GMV %",
                renderer:value=>`${value.toFixed(1)}%`
            },

            {
                key:"unitShare",
                label:"Units %",
                renderer:value=>`${value.toFixed(1)}%`
            }

        ],

        rows:data

    });

}