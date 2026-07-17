/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : PO Type Report Renderer
 * Version : V12.0
 * =====================================================
 */

import { renderTable } from "../../../components/common/table/table.js";

export async function renderPOTypeReport(

    target,

    rows

){

    await renderTable({

        target,

        title:"PO Type Analysis",

        subtitle:"Performance by Fulfilment Type",

        columns:[

            {
                key:"poType",
                label:"PO Type",
                align:"left"
            },

            {
                key:"saleGMV",
                label:"Sale GMV",
                format:"currency"
            },

            {
                key:"saleUnits",
                label:"Sale Units",
                format:"number"
            },

            {
                key:"cancelGMV",
                label:"Cancel GMV",
                format:"currency"
            },

            {
                key:"cancelUnits",
                label:"Cancel Units",
                format:"number"
            },

            {
                key:"rtoGMV",
                label:"RTO GMV",
                format:"currency"
            },

            {
                key:"rtoUnits",
                label:"RTO Units",
                format:"number"
            },

            {
                key:"cxGMV",
                label:"CX Return GMV",
                format:"currency"
            },

            {
                key:"cxUnits",
                label:"CX Return Units",
                format:"number"
            },

            {
                key:"netGMV",
                label:"Net GMV",
                format:"currency"
            },

            {
                key:"netUnits",
                label:"Net Units",
                format:"number"
            }

        ],

        rows

    });

}