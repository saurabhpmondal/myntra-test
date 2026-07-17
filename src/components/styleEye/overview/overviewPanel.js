/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Overview Panel
 * Version : V1.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { buildOverview } from "../../../services/styleEye/overviewService.js";

import {

    formatCompactCurrency,

    formatCompactNumber,

    formatNumber

} from "../../../utils/formatter.js";

/**
 * =====================================================
 * Render Overview Panel
 * =====================================================
 */

export async function renderOverviewPanel(

    target,

    context

){

    await createComponent({

        target,

        html:"src/components/styleEye/overview/overviewPanel.html",

        css:"src/components/styleEye/overview/overviewPanel.css"

    });

    const overview = buildOverview(

        context

    );

    const grid =

        target.querySelector(

            "#overviewGrid"

        );

    const cards = [

        {

            title:"90 Day Sales",

            value:formatNumber(

                overview.sales90

            ),

            subtitle:"Units Sold"

        },

        {

            title:"Current Month",

            value:formatNumber(

                overview.currentMonthSales

            ),

            subtitle:"Units Sold"

        },

        {

            title:"90 Day GMV",

            value:formatCompactCurrency(

                overview.gmv90

            ),

            subtitle:"Gross Merchandise Value"

        },

        {

            title:"Current GMV",

            value:formatCompactCurrency(

                overview.currentGMV

            ),

            subtitle:"Current Month"

        },

        {

            title:"Seller Stock",

            value:formatCompactNumber(

                overview.sellerStock

            ),

            subtitle:"ERP Stock"

        },

        {

            title:"SJIT Stock",

            value:formatCompactNumber(

                overview.sjitStock

            ),

            subtitle:"Warehouse"

        },

        {

            title:"SOR Stock",

            value:formatCompactNumber(

                overview.sorStock

            ),

            subtitle:"Warehouse"

        },

        {

            title:"Stock Cover",

            value:

                `${Math.round(

                    overview.stockCover

                )} Days`,

            subtitle:"Based on DRR"

        }

    ];

    grid.innerHTML = cards.map(card=>`

<div class="overview-card">

    <div class="overview-title">

        ${card.title}

    </div>

    <div class="overview-value">

        ${card.value}

    </div>

    <div class="overview-subtitle">

        ${card.subtitle}

    </div>

</div>

`).join("");

}