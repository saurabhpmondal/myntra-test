/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Business KPI Row
 * Version : V1.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { getBusinessKPIs } from "../../../services/businessKPIService.js";

export async function renderBusinessKPIRow(target){

    await createComponent({

        target,

        html:"src/components/business/kpiRow/kpiRow.html",

        css:"src/components/business/kpiRow/kpiRow.css"

    });

    const kpis = getBusinessKPIs();

    const container = target.querySelector(".business-kpi-row");

    container.innerHTML = "";

    kpis.forEach(card=>{

        const div = document.createElement("div");

        div.className = "kpi-card";

        div.innerHTML = `

            <div class="kpi-title">

                ${card.title}

            </div>

            <div class="kpi-value">

                ${card.value}

            </div>

            <div class="kpi-subtitle">

                ${card.subtitle}

            </div>

        `;

        container.appendChild(div);

    });

}