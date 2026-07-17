/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Dead Launch Renderer
 * Version : V2.2
 * =====================================================
 */

import {

    renderTable

}

from "../../../components/common/table/table.js";

export async function renderDeadLaunch(

    target,

    rows=[]

){

    await renderTable({

        target,

        title:

            "Dead Launch Report",

        subtitle:

            "Identify launches with no sales so they can be reviewed for pricing, content or marketing improvements.",

        columns:[

            {

                key:"sr",

                label:"#"

            },

            {

                key:"styleId",

                label:"Style ID",

                renderer:value=>`

<a

href="https://www.myntra.com/${value}"

target="_blank"

class="table-link"

style="font-weight:600;"

>

${value}

</a>

`

            },

            {

                key:"brand",

                label:"Brand"

            },

            {

                key:"launchDate",

                label:"Launch Date",

                renderer:value=>

                    formatDate(

                        value

                    )

            },

            {

                key:"launchAge",

                label:"Launch Age",

                renderer:value=>

                    `${value} Days`

            },

            {

                key:"orders",

                label:"Orders",

                format:"number"

            },

            {

                key:"revenue",

                label:"Revenue",

                format:"currency"

            },

            {

                key:"daysWithoutSale",

                label:"Days Without Sale",

                renderer:value=>

                    buildDaysBadge(

                        value

                    )

            }

        ],

        rows:

            rows.map(

                (

                    row,

                    index

                )=>({

                    sr:

                        index+1,

                    ...row

                })

            )

    });

}

/**
 * =====================================================
 * Days Badge
 * =====================================================
 */

function buildDaysBadge(

    value

){

    return `

<span class="badge-danger">

${value ?? 0} Days

</span>

`;

}

/**
 * =====================================================
 * Format Date
 * =====================================================
 */

function formatDate(

    value

){

    if(

        !value

    ){

        return "-";

    }

    const date=

        value instanceof Date

        ?

        value

        :

        new Date(

            value

        );

    return date.toLocaleDateString(

        "en-IN",

        {

            day:"2-digit",

            month:"short",

            year:"numeric"

        }

    );

}