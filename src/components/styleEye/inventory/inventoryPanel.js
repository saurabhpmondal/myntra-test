/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Inventory Intelligence
 * Version : V1.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { buildInventory } from "../../../services/styleEye/inventoryService.js";

import {

    formatNumber

} from "../../../utils/formatter.js";

/**
 * =====================================================
 * Render
 * =====================================================
 */

export async function renderInventoryPanel(

    target,

    context

){

    await createComponent({

        target,

        html:"src/components/styleEye/inventory/inventoryPanel.html",

        css:"src/components/styleEye/inventory/inventoryPanel.css"

    });

    const inventory =

        buildInventory(context);

    renderSnapshot(

        target,

        inventory.snapshot

    );

    renderHealth(

        target,

        inventory.health,

        inventory.snapshot

    );

    renderAction(

        target,

        inventory.action

    );

}

/**
 * =====================================================
 * Snapshot
 * =====================================================
 */

function renderSnapshot(

    target,

    snapshot

){

    const container =

        target.querySelector(

            "#inventorySnapshot"

        );

    container.className =

        "inventory-grid";

    const cards = [

        {

            title:"Seller Stock",

            value:formatNumber(

                snapshot.sellerStock

            ),

            subtitle:"Seller Warehouse"

        },

        {

            title:"SJIT Stock",

            value:formatNumber(

                snapshot.sjitStock

            ),

            subtitle:"Myntra SJIT"

        },

        {

            title:"SOR Stock",

            value:formatNumber(

                snapshot.sorStock

            ),

            subtitle:"Myntra SOR"

        },

        {

            title:"Total Stock",

            value:formatNumber(

                snapshot.totalStock

            ),

            subtitle:"Available Inventory"

        },

        {

            title:"Daily Run Rate",

            value:snapshot.drr.toFixed(2),

            subtitle:"Units / Day"

        },

        {

            title:"Stock Cover",

            value:

                Math.round(

                    snapshot.stockCover

                ) + " Days",

            subtitle:"Current Cover"

        }

    ];

    container.innerHTML = cards.map(card=>`

<div class="inventory-card">

    <div class="inventory-title">

        ${card.title}

    </div>

    <div class="inventory-value">

        ${card.value}

    </div>

    <div class="inventory-subtitle">

        ${card.subtitle}

    </div>

</div>

`).join("");

}

/**
 * =====================================================
 * Health
 * =====================================================
 */

function renderHealth(

    target,

    health,

    snapshot

){

    const container =

        target.querySelector(

            "#inventoryHealth"

        );

    container.innerHTML = `

<div class="inventory-health">

    <div class="inventory-health-title">

        Inventory Health

    </div>

    <div class="inventory-health-status">

        ${health.icon}

        ${health.status}

    </div>

    <div class="inventory-health-description">

        ${health.description}

    </div>

    <div class="inventory-health-range">

        Current Stock Cover :
        <b>${Math.round(snapshot.stockCover)} Days</b>

        <br><br>

        Ideal Range :
        <b>${health.idealRange}</b>

    </div>

</div>

`;

}

/**
 * =====================================================
 * Business Action
 * =====================================================
 */

function renderAction(

    target,

    action

){

    const container =

        target.querySelector(

            "#inventoryAction"

        );

    const theme =

        action.type==="SHIPMENT"

        ?

        "warning"

        :

        action.type==="RECALL"

        ?

        "danger"

        :

        action.type==="MONITOR"

        ?

        "info"

        :

        "success";

    container.innerHTML = `

<div class="inventory-action ${theme}">

    <div class="inventory-action-header">

        <div class="inventory-action-title">

            ${action.icon}

            ${action.title}

        </div>

        <div class="inventory-priority">

            ${action.priority}

        </div>

    </div>

    <div class="inventory-action-grid">

        <div class="inventory-action-item">

            <div class="inventory-action-label">

                Quantity

            </div>

            <div class="inventory-action-value">

                ${formatNumber(action.quantity)}

            </div>

        </div>

        <div class="inventory-action-item">

            <div class="inventory-action-label">

                Target Cover

            </div>

            <div class="inventory-action-value">

                ${action.targetCover} Days

            </div>

        </div>

        <div class="inventory-action-item">

            <div class="inventory-action-label">

                Expected Cover

            </div>

            <div class="inventory-action-value">

                ${action.expectedCover} Days

            </div>

        </div>

    </div>

    <div class="inventory-action-description">

        ${action.description}

    </div>

</div>

`;

}