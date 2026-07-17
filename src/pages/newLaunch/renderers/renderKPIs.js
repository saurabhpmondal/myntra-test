/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : New Launch KPI Renderer
 * Version : V1.0
 * =====================================================
 */

import {

    formatNumber,

    formatCompactCurrency

}

from "../../../utils/formatter.js";

export async function renderKPIs(

    target,

    kpis={}

){

    target.innerHTML=`

<div class="kpi-grid">

    ${buildCard(

        "New Launches",

        formatNumber(

            kpis.totalLaunches||0

        ),

        "Styles launched in selected window"

    )}

    ${buildCard(

        "Sold Styles",

        formatNumber(

            kpis.soldStyles||0

        ),

        "Launches with at least one sale"

    )}

    ${buildCard(

        "Dead Launches",

        formatNumber(

            kpis.deadLaunches||0

        ),

        "Launches with zero sales"

    )}

    ${buildCard(

        "Units Sold",

        formatNumber(

            kpis.unitsSold||0

        ),

        "Total Units Sold"

    )}

    ${buildCard(

        "Revenue",

        formatCompactCurrency(

            kpis.revenue||0

        ),

        "Revenue Generated"

    )}

</div>

`;

}

/**
 * =====================================================
 * KPI Card
 * =====================================================
 */

function buildCard(

    title,

    value,

    tooltip

){

    return `

<div

    class="kpi-card"

    title="${tooltip}"

>

    <div class="kpi-title">

        ${title}

    </div>

    <div class="kpi-value">

        ${value}

    </div>

</div>

`;

}