/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : KPI Renderer
 * Version : V13.5
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
 * Compare Label
 * =====================================================
 */

function compareLabel(item){

    return item?.compareLabel ||

        "Previous Period";

}

/**
 * =====================================================
 * Growth Value
 * =====================================================
 */

function growth(item,key){

    return Number(

        item?.[key] ?? 0

    );

}

/**
 * =====================================================
 * Business Growth Color
 * =====================================================
 */

function growthType(title,value){

    const negative=[

        "Cancelled",

        "RTO",

        "CX Return"

    ];

    if(negative.includes(title)){

        return value>0

            ? "negative"

            : "positive";

    }

    return value>=0

        ? "positive"

        : "negative";

}

/**
 * =====================================================
 * Build Amount Card
 * =====================================================
 */

async function buildAmountCard(

    id,

    title,

    item,

    icon

){

    await renderKPICard(

        document.getElementById(id),

        {

            title,

            value:formatAmount(item.gmv),

            subtitle:

                Number(item.units)

                    .toLocaleString("en-IN")

                +

                " Units",

            icon,

            growth:

                growth(

                    item,

                    "gmvGrowth"

                ),

            compareLabel:

                compareLabel(item),

            growthType:

                growthType(

                    title,

                    growth(

                        item,

                        "gmvGrowth"

                    )

                )

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

    item,

    icon

){

    await renderKPICard(

        document.getElementById(id),

        {

            title,

            value:

                Number(item.units)

                    .toLocaleString("en-IN"),

            subtitle:"Units",

            icon,

            growth:

                growth(

                    item,

                    "unitGrowth"

                ),

            compareLabel:

                compareLabel(item),

            growthType:

                growthType(

                    title,

                    growth(

                        item,

                        "unitGrowth"

                    )

                )

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

        dashboard.sale,

        "badge-indian-rupee"

    );

    await buildAmountCard(

        "srCancel",

        "Cancelled",

        dashboard.cancel,

        "circle-x"

    );

    await buildAmountCard(

        "srRTO",

        "RTO",

        dashboard.rto,

        "rotate-ccw"

    );

    await buildAmountCard(

        "srCX",

        "CX Return",

        dashboard.cx,

        "package-x"

    );

    await buildAmountCard(

        "srNet",

        "Net",

        dashboard.net,

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

        dashboard.sale,

        "package"

    );

    await buildUnitCard(

        "srCancelUnits",

        "Cancelled",

        dashboard.cancel,

        "circle-x"

    );

    await buildUnitCard(

        "srRTOUnits",

        "RTO",

        dashboard.rto,

        "rotate-ccw"

    );

    await buildUnitCard(

        "srCXUnits",

        "CX Return",

        dashboard.cx,

        "package-x"

    );

    await buildUnitCard(

        "srNetUnits",

        "Net",

        dashboard.net,

        "wallet"

    );

}

    await buildAmountCard(

        "srRTO",

        "RTO",

        dashboard.rto,

        "rotate-ccw"

    );

    await buildAmountCard(

        "srCX",

        "CX Return",

        dashboard.cx,

        "package-x"

    );

    await buildAmountCard(

        "srNet",

        "Net",

        dashboard.net,

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

        dashboard.sale,

        "package"

    );

    await buildUnitCard(

        "srCancelUnits",

        "Cancelled",

        dashboard.cancel,

        "circle-x"

    );

    await buildUnitCard(

        "srRTOUnits",

        "RTO",

        dashboard.rto,

        "rotate-ccw"

    );

    await buildUnitCard(

        "srCXUnits",

        "CX Return",

        dashboard.cx,

        "package-x"

    );

    await buildUnitCard(

        "srNetUnits",

        "Net",

        dashboard.net,

        "wallet"

    );