/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Trend Report Renderer
 * Version : V12.0
 * =====================================================
 */

import { renderTable } from "../../../components/common/table/table.js";

export async function renderTrendReport(

    target,

    rows

){

    await renderTable({

        target,

        title:"Monthly Trend",

        subtitle:"Month-wise Sales & Return Performance",

        columns:[

            {
                key:"period",
                label:"Period",
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
            },

            {
                key:"returnPct",

                label:"Return %",

                renderer:value=>

                    `${Number(value||0).toFixed(2)}%`

            }

        ],

        rows

    });

}