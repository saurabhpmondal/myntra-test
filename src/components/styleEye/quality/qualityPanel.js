/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Quality Intelligence
 * Version : V1.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { buildQuality } from "../../../services/styleEye/qualityService.js";

import {

    formatNumber,
    formatPercentage

} from "../../../utils/formatter.js";

/**
 * =====================================================
 * Render
 * =====================================================
 */

export async function renderQualityPanel(

    target,

    context

){

    await createComponent({

        target,

        html:"src/components/styleEye/quality/qualityPanel.html",

        css:"src/components/styleEye/quality/qualityPanel.css"

    });

    const quality =

        buildQuality(context);

    renderSnapshot(

        target,

        quality.snapshot

    );

    renderReasons(

        target,

        quality.analysis.reasons

    );

    renderRisks(

        target,

        quality.analysis.risks

    );

    renderHealth(

        target,

        quality.health

    );

    renderSummary(

        target,

        quality.summary

    );

    renderAction(

        target,

        quality.action

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

            "#qualitySnapshot"

        );

    container.className =

        "quality-grid";

    const cards=[

        {

            title:"Customer Rating",

            value:

                snapshot.rating.toFixed(1),

            subtitle:"Marketplace Rating"

        },

        {

            title:"Gross Sale",

            value:

                formatNumber(

                    snapshot.grossSaleUnits

                ),

            subtitle:"Units Sold"

        },

        {

            title:"Customer Return",

            value:

                formatPercentage(

                    snapshot.customerReturnPercent

                ),

            subtitle:

                formatNumber(

                    snapshot.customerReturnUnits

                )+" Units"

        },

        {

            title:"Courier RTO",

            value:

                formatPercentage(

                    snapshot.rtoPercent

                ),

            subtitle:

                formatNumber(

                    snapshot.courierReturnUnits

                )+" Units"

        }

    ];

    container.innerHTML =

        cards.map(card=>`

<div class="quality-card">

    <div class="quality-title">

        ${card.title}

    </div>

    <div class="quality-value">

        ${card.value}

    </div>

    <div class="quality-subtitle">

        ${card.subtitle}

    </div>

</div>

`).join("");

}

/**
 * =====================================================
 * Return Reasons
 * =====================================================
 */

function renderReasons(

    target,

    reasons

){

    const container =

        target.querySelector(

            "#qualityReasons"

        );

    container.innerHTML = `

<div class="analysis-card">

<h3>

Return Reasons

</h3>

${reasons.length

?reasons.map(reason=>`

<div class="reason-row">

<div class="reason-header">

<span>

${reason.reason}

</span>

<span>

${formatPercentage(

reason.percent

)}

</span>

</div>

<div class="reason-bar">

<div

class="reason-fill"

style="width:${reason.percent}%"

></div>

</div>

</div>

`).join("")

:"<p>No customer returns found.</p>"

}

</div>

`;

}

/**
 * =====================================================
 * Risk Indicators
 * =====================================================
 */

function renderRisks(

    target,

    risks

){

    const container =

        target.querySelector(

            "#qualityRisks"

        );

    container.innerHTML = `

<div class="analysis-card">

<h3>

Risk Indicators

</h3>

${risks.map(risk=>`

<div class="risk-chip

${risk.status==="GOOD"

?"risk-good"

:risk.status==="HIGH"

?"risk-danger"

:"risk-warning"}

">

<span>

${risk.label}

</span>

<b>

${risk.status}

</b>

</div>

`).join("")}

</div>

`;

}

/**
 * =====================================================
 * Health
 * =====================================================
 */

function renderHealth(

    target,

    health

){

    target.querySelector(

        "#qualityHealth"

    ).innerHTML=`

<div class="quality-health">

<div class="quality-health-title">

Quality Health

</div>

<div class="quality-health-status">

${health.icon}

${health.status}

</div>

<div class="quality-health-description">

${health.description}

</div>

</div>

`;

}

/**
 * =====================================================
 * Executive Summary
 * =====================================================
 */

function renderSummary(

    target,

    summary

){

    target.querySelector(

        "#qualitySummary"

    ).innerHTML=`

<div class="quality-summary">

<h3>

Executive Summary

</h3>

<ul>

${summary.map(item=>`

<li>

${item}

</li>

`).join("")}

</ul>

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

    const container=

        target.querySelector(

            "#qualityAction"

        );

    const theme=

        action.priority==="LOW"

        ?"success"

        :action.priority==="MEDIUM"

        ?"warning"

        :"danger";

    container.innerHTML=`

<div class="quality-action ${theme}">

<div class="quality-action-header">

<div class="quality-action-title">

${action.icon}

${action.title}

</div>

<div class="quality-priority">

${action.priority}

</div>

</div>

<div class="quality-action-description">

${action.description}

</div>

</div>

`;

}