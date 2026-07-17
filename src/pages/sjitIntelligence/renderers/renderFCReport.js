/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : FC Report Renderer
 * Version : V1.1
 * =====================================================
 */

import {
    renderTable
}
from "../../../components/common/table/table.js";

export async function renderFCReport(

    target,

    rows

){

    await renderTable({

        target,

        title:"FC Intelligence",

        subtitle:"Warehouse-wise Stock & Sales Performance",

        columns:[

            {
                key:"fc",
                label:"FC"
            },

            {
                key:"region",
                label:"Region"
            },

            {
                key:"stock",
                label:"Stock",
                format:"number"
            },

            {
                key:"soldQty",
                label:"Sold Qty",
                format:"number"
            },

            {
                key:"sellThrough",
                label:"Sell Through",
                renderer:value=>`
<span title="(Sold Qty ÷ Stock) × 100">
${Number(value||0).toFixed(1)}%
</span>`
            },

            {
                key:"stockPer",
                label:"Stock %",
                renderer:value=>`${Number(value||0).toFixed(1)}%`
            },

            {
                key:"salePer",
                label:"Sale %",
                renderer:value=>`${Number(value||0).toFixed(1)}%`
            },

            {
                key:"gap",
                label:"Gap",
                renderer:value=>{

                    const gap=Number(value||0);

                    return `

<span

style="

font-weight:600;

color:${gap>=0?"#16a34a":"#dc2626"};

"

>

${gap.toFixed(1)}%

</span>

`;

                }

            }

        ],

        rows

    });

}