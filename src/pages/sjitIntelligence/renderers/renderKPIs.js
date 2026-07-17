/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SJIT KPI Renderer
 * Version : V2.0
 * =====================================================
 */

import {

    formatNumber

}

from "../../../utils/formatter.js";

export async function renderKPIs(

    target,

    kpis={}

){

    target.innerHTML=`

<div class="kpi-grid">

    ${buildCard(

        "Total Stock",

        formatNumber(

            kpis.totalStock||0

        ),

        "Current SJIT Inventory"

    )}

    ${buildCard(

        "Total Sale",

        formatNumber(

            kpis.totalSale||0

        ),

        "Last 30 Days SJIT Sale"

    )}

    ${buildCard(

        "Sell Through",

        formatSellThrough(

            kpis.sellThrough

        ),

        "Sold Qty ÷ Current Stock"

    )}

    ${buildCard(

        "Top FC",

        getTopFC(

            kpis.topFC

        ),

        "Highest Selling Fulfilment Centre"

    )}

    ${buildCard(

        "Top State",

        getTopState(

            kpis.topState

        ),

        "Highest Selling State"

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

    subtitle

){

    return `

<div class="kpi-card">

    <div class="kpi-title">

        ${title}

    </div>

    <div class="kpi-value">

        ${value}

    </div>

    <div class="kpi-subtitle">

        ${subtitle}

    </div>

</div>

`;

}

/**
 * =====================================================
 * Sell Through
 * =====================================================
 */

function formatSellThrough(

    value

){

    return `${

        Number(

            value||0

        ).toFixed(1)

    }%`;

}

/**
 * =====================================================
 * Top FC
 * =====================================================
 */

function getTopFC(

    fc

){

    if(!fc){

        return "-";

    }

    return(

        fc.shortName||

        fc.fc||

        fc.warehouseName||

        "-"

    );

}

/**
 * =====================================================
 * Top State
 * =====================================================
 */

function getTopState(

    state

){

    if(!state){

        return "-";

    }

    return(

        state.state||

        state.name||

        "-"

    );

}