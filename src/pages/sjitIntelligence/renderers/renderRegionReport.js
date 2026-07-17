/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Region Report Renderer
 * Version : V1.1
 * =====================================================
 */

import {
    renderTable
}
from "../../../components/common/table/table.js";

export async function renderRegionReport(

    target,

    rows

){

    await renderTable({

        target,

        title:"Regional Performance",

        subtitle:"Region-wise SJIT Sales",

        columns:[

            {
                key:"region",
                label:"Region"
            },

            {
                key:"soldQty",
                label:"Sold Qty",
                format:"number"
            },

            {
                key:"contribution",
                label:"Contribution",

                renderer:value=>

`${Number(value||0).toFixed(1)}%`

            }

        ],

        rows

    });

}