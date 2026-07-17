/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : PO Type Performance
 * Version : V1.0
 * =====================================================
 */

import { renderTable } from "../../common/table/table.js";

import { getPOTypePerformance } from "../../../services/poTypeService.js";

export async function renderPOTypePerformance(target){

    const data = getPOTypePerformance();

    await renderTable({

        target,

        title:"PO Type Wise Sales Share",

        subtitle:"Current Month Performance",

        columns:[

            {
                key:"poType",
                label:"PO Type"
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