/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Return Reason Report Renderer
 * Version : V12.1
 * =====================================================
 */

import { renderTable } from "../../../components/common/table/table.js";

export async function renderReturnReasonReport(

    target,

    rows

){

    await renderTable({

        target,

        title:"Return Reason Analysis",

        subtitle:"RTO & Customer Return Analysis",

        columns:[

            {
                key:"returnReason",
                label:"Return Reason",
                align:"left"
            },

            {
                key:"returnGMV",
                label:"Return GMV",
                format:"currency"
            },

            {
                key:"returnUnits",
                label:"Return Units",
                format:"number"
            },

            {
                key:"contribution",
                label:"Contribution %",
                renderer:(value)=>`${Number(value||0).toFixed(2)}%`
            }

        ],

        rows

    });

}

