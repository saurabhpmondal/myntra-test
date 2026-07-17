/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : KPI Card
 * Version : V1.2
 * =====================================================
 */

import { createComponent } from "../../utils/createComponent.js";

export async function renderKPICard(target, data) {

    await createComponent({

        target,

        html: "src/components/kpiCard/kpiCard.html",

        css: "src/components/kpiCard/kpiCard.css",

        data

    });

    // Render Lucide Icons
    if (window.lucide) {

        lucide.createIcons();

    }

    // Growth Indicator
    const trend = target.querySelector(".kpi-trend");

    if (trend) {

        const growth = Number(data.growth || 0);

        trend.classList.remove("up","down","flat");

        if (growth > 0) {

            trend.classList.add("up");

            trend.innerHTML = `▲ ${growth.toFixed(1)}%`;

        }

        else if (growth < 0) {

            trend.classList.add("down");

            trend.innerHTML = `▼ ${Math.abs(growth).toFixed(1)}%`;

        }

        else {

            trend.classList.add("flat");

            trend.innerHTML = `0.0%`;

        }

    }

    // Comparison Label

    const compare = target.querySelector(".kpi-compare");

    if (compare) {

        compare.textContent = `vs ${data.compareLabel || "Previous Month"}`;

    }

}