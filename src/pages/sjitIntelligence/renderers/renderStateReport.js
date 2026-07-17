/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : State Report Renderer
 * Version : V1.1
 * =====================================================
 */

import {
    renderTable
}
from "../../../components/common/table/table.js";

export async function renderStateReport(

    target,

    rows

){

    await renderTable({

        target,

        title:"State Performance",

        subtitle:"State-wise SJIT Sales",

        columns:[

            {
                key:"state",
                label:"State"
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