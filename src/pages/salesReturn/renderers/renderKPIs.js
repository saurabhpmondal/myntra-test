/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : KPI Renderer
 * Version : V12.3
 * =====================================================
 */

import { renderKPICard } from "../../../components/kpiCard/kpiCard.js";

/**
 * =====================================================
 * Format Currency
 * =====================================================
 */

function formatAmount(value){

    return "₹" +

        Number(value || 0)

            .toLocaleString("en-IN");

}

/**
 * =====================================================
 * Build Amount Card
 * =====================================================
 */

async function buildAmountCard(

    id,

    title,

    amount,

    units,

    icon

){

    await renderKPICard(

        document.getElementById(id),

        {

            title,

            value:formatAmount(amount),

            subtitle:

                Number(units)

                    .toLocaleString("en-IN")

                +

                " Units",

            icon,

            growth:0,

            compareLabel:"Previous Period"

        }

    );

}

/**
 * =====================================================
 * Build Unit Card
 * =====================================================
 */

async function buildUnitCard(

    id,

    title,

    units,

    icon

){

    await renderKPICard(

        document.getElementById(id),

        {

            title,

            value:

                Number(units)

                    .toLocaleString("en-IN"),

            subtitle:"Units",

            icon,

            growth:0,

            compareLabel:"Previous Period"

        }

    );

}

/**
 * =====================================================
 * Render KPI
 * =====================================================
 */

export async function renderKPIs(

    target,

    dashboard

){

    target.innerHTML = `

<style>

.sales-return-kpi-section{

    margin-bottom:28px;

}

.sales-return-kpi-heading{

    font-size:18px;

    font-weight:700;

    color:#111827;

    margin:0 0 14px 4px;

}

.sales-return-kpi-grid{

    display:grid;

    grid-template-columns:repeat(5,minmax(0,1fr));

    gap:20px;

}

.sales-return-kpi-section + .sales-return-kpi-section{

    margin-top:30px;

}

@media(max-width:1400px){

    .sales-return-kpi-grid{

        grid-template-columns:repeat(3,minmax(0,1fr));

    }

}

@media(max-width:900px){

    .sales-return-kpi-grid{

        grid-template-columns:repeat(2,minmax(0,1fr));

    }

}

@media(max-width:640px){

    .sales-return-kpi-grid{

        grid-template-columns:1fr;

    }

}

</style>

<div class="sales-return-kpi-section">

    <div class="sales-return-kpi-heading">

        GMV Performance

    </div>

    <div class="sales-return-kpi-grid">

        <div id="srSale"></div>

        <div id="srCancel"></div>

        <div id="srRTO"></div>

        <div id="srCX"></div>

        <div id="srNet"></div>

    </div>

</div>

<div class="sales-return-kpi-section">

    <div class="sales-return-kpi-heading">

        Unit Performance

    </div>

    <div class="sales-return-kpi-grid">

        <div id="srSaleUnits"></div>

        <div id="srCancelUnits"></div>

        <div id="srRTOUnits"></div>

        <div id="srCXUnits"></div>

        <div id="srNetUnits"></div>

    </div>

</div>

`;

    /**
     * ==========================================
     * GMV Cards
     * ==========================================
     */

    await buildAmountCard(

        "srSale",

        "Sale",

        dashboard.sale.gmv,

        dashboard.sale.units,

        "badge-indian-rupee"

    );

    await buildAmountCard(

        "srCancel",

        "Cancelled",

        dashboard.cancel.gmv,

        dashboard.cancel.units,

        "circle-x"

    );

    await buildAmountCard(

        "srRTO",

        "RTO",

        dashboard.rto.gmv,

        dashboard.rto.units,

        "rotate-ccw"

    );

    await buildAmountCard(

        "srCX",

        "CX Return",

        dashboard.cx.gmv,

        dashboard.cx.units,

        "package-x"

    );

    await buildAmountCard(

        "srNet",

        "Net",

        dashboard.net.gmv,

        dashboard.net.units,

        "wallet"

    );

    /**
     * ==========================================
     * Unit Cards
     * ==========================================
     */

    await buildUnitCard(

        "srSaleUnits",

        "Sale",

        dashboard.sale.units,

        "package"

    );

    await buildUnitCard(

        "srCancelUnits",

        "Cancelled",

        dashboard.cancel.units,

        "circle-x"

    );

    await buildUnitCard(

        "srRTOUnits",

        "RTO",

        dashboard.rto.units,

        "rotate-ccw"

    );

    await buildUnitCard(

        "srCXUnits",

        "CX Return",

        dashboard.cx.units,

        "package-x"

    );

    await buildUnitCard(

        "srNetUnits",

        "Net",

        dashboard.net.units,

        "wallet"

    );

}