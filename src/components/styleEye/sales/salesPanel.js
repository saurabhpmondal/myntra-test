/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Sales Intelligence Panel
 * Version : V1.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { buildSales } from "../../../services/styleEye/salesService.js";

import {

    formatNumber,

    formatCompactCurrency,

    formatCurrency

} from "../../../utils/formatter.js";

export async function renderSalesPanel(

    target,

    context

){

    await createComponent({

        target,

        html:"src/components/styleEye/sales/salesPanel.html",

        css:"src/components/styleEye/sales/salesPanel.css"

    });

    const sales = buildSales(context);

    renderSummary(

        target,

        sales

    );

    renderTimeline(

        target,

        sales

    );

}

/**
 * =====================================================
 * Summary Cards
 * =====================================================
 */

function renderSummary(

    target,

    sales

){

    const container =

        target.querySelector(

            "#salesSummary"

        );

    container.className =

        "sales-summary";

    const cards = [

        {

            title:"90 Day Sales",

            value:formatNumber(

                sales.totalUnits

            ),

            subtitle:"Units Sold"

        },

        {

            title:"90 Day GMV",

            value:formatCompactCurrency(

                sales.totalGMV

            ),

            subtitle:"Revenue"

        },

        {

            title:"Average Monthly Sale",

            value:formatNumber(

                Math.round(

                    sales.averageUnits

                )

            ),

            subtitle:"Units / Month"

        },

        {

            title:"Average Selling Price",

            value:formatCurrency(

                sales.asp

            ),

            subtitle:"ASP"

        }

    ];

    container.innerHTML = cards.map(card=>`

<div class="sales-card">

    <div class="sales-card-title">

        ${card.title}

    </div>

    <div class="sales-card-value">

        ${card.value}

    </div>

    <div class="sales-card-subtitle">

        ${card.subtitle}

    </div>

</div>

`).join("");

}

/**
 * =====================================================
 * Timeline
 * =====================================================
 */

function renderTimeline(

    target,

    sales

){

    const container =

        target.querySelector(

            "#salesTimeline"

        );

    container.className =

        "sales-timeline";

    container.innerHTML =

        sales.timeline.map(month=>`

<div class="sales-month">

    <div class="sales-month-title">

        ${month.month}-${month.year}

    </div>

    <div class="sales-month-item">

        <span class="sales-month-label">

            Units

        </span>

        <span class="sales-month-value">

            ${formatNumber(month.units)}

        </span>

    </div>

    <div class="sales-month-item">

        <span class="sales-month-label">

            GMV

        </span>

        <span class="sales-month-value">

            ${formatCompactCurrency(month.gmv)}

        </span>

    </div>

    <div class="sales-month-item">

        <span class="sales-month-label">

            ASP

        </span>

        <span class="sales-month-value">

            ${formatCurrency(

                month.units

                ?

                month.gmv/month.units

                :

                0

            )}

        </span>

    </div>

</div>

`).join("");

}