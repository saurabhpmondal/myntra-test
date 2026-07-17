/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index Table
 * Version : V2.1
 * =====================================================
 */

import { openStyle } from "../../styleEye/search/openStyle.js";

export async function renderTable(

    target,

    rows=[]

){

    target.innerHTML=`

<div class="di-table-wrapper">

<table class="di-table">

<thead>

<tr>

<th>#</th>

<th>👁</th>

<th>Overall</th>

<th>Brand</th>

<th>Style ID</th>

<th>ERP SKU</th>

<th>Brand</th>

<th>Category</th>

<th>Status</th>

<th>Units</th>

<th>Overall DW</th>

<th>Brand DW</th>

<th>Cumulative</th>

<th>Badges</th>

</tr>

</thead>

<tbody>

${buildRows(rows)}

</tbody>

</table>

</div>

`;

    bindEvents(

        target

    );

}

/**
 * =====================================================
 * Events
 * =====================================================
 */

function bindEvents(

    target

){

    target.querySelectorAll(

        ".di-eye-btn"

    ).forEach(

        button=>{

            button.onclick=

            async()=>{

                const styleId=

                    button.dataset.style;

                const app=

                    document.querySelector(

                        "#app"

                    );

                if(

                    !app

                ){

                    return;

                }

                await openStyle(

                    app,

                    styleId

                );

            };

        }

    );

}

/**
 * =====================================================
 * Build Rows
 * =====================================================
 */

function buildRows(

    rows

){

    if(

        !rows.length

    ){

        return`

<tr>

<td
colspan="14"
class="di-table-empty">

No records found.

</td>

</tr>

`;

    }

    return rows.map(

        row=>`

<tr>

<td>

${row.overallRank}

</td>

<td>

<button

class="di-eye-btn"

data-style="${row.styleId}"

title="Open Style Eye">

👁

</button>

</td>

<td>

${row.overallRank}

</td>

<td>

${row.brandRank}

</td>

<td>

<a

href="https://www.myntra.com/${row.styleId}"

target="_blank"

class="di-style-link">

${row.styleId}

</a>

</td>

<td>

${row.erpSku}

</td>

<td>

${row.brand}

</td>

<td>

${row.category}

</td>

<td>

${row.erpStatus}

</td>

<td>

${row.unitsSold.toLocaleString()}

</td>

<td>

${(

    row.overallDW*100

).toFixed(

    2

)}%

</td>

<td>

${(

    row.brandDW*100

).toFixed(

    2

)}%

</td>

<td>

${(

    row.cumulativeDW*100

).toFixed(

    2

)}%

</td>

<td>

${renderBadges(

    row.badges

)}

</td>

</tr>

`

    ).join("");

}

/**
 * =====================================================
 * Badges
 * =====================================================
 */

function renderBadges(

    badges=[]

){

    if(

        !badges.length

    ){

        return "-";

    }

    return badges.map(

        badge=>`

<span

class="di-badge">

${badge}

</span>

`

    ).join(

        " "

    );

}