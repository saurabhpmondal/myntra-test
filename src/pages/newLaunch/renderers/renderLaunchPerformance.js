/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Launch Performance Renderer
 * Version : V2.2
 * =====================================================
 */

import {

    renderTable

}

from "../../../components/common/table/table.js";

export async function renderLaunchPerformance(

    target,

    rows=[]

){

    await renderTable({

        target,

        title:

            "Launch Performance",

        subtitle:

            "Rank launched styles by sales, revenue and status to identify winning and underperforming launches.",

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

                key:"units",

                label:"Units Sold",

                format:"number"

            },

            {

                key:"revenue",

                label:"Revenue",

                format:"currency"

            },

            {

                key:"orders",

                label:"Orders",

                format:"number"

            },

            {

                key:"asp",

                label:"ASP",

                format:"currency"

            },

            {

                key:"status",

                label:"Status",

                renderer:value=>

                    buildStatus(

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
 * Status Badge
 * =====================================================
 */

function buildStatus(

    status

){

    let cls=

        "badge-neutral";

    if(

        status?.includes(

            "Hot"

        )

    ){

        cls=

            "badge-success";

    }

    else if(

        status?.includes(

            "Good"

        )

    ){

        cls=

            "badge-primary";

    }

    else if(

        status?.includes(

            "Slow"

        )

    ){

        cls=

            "badge-warning";

    }

    else if(

        status?.includes(

            "Dead"

        )

    ){

        cls=

            "badge-danger";

    }

    return `

<span class="${cls}">

${status??"-"}

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