/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Dashboard KPI Row
 * Version : V1.1
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { renderKPICard } from "../../kpiCard/kpiCard.js";

import { getDashboardSummary } from "../../../services/dashboardService.js";

import {
    formatCompactCurrency,
    formatNumber,
    formatCurrency
} from "../../../utils/formatter.js";

export async function renderKPIRow(target) {

    await createComponent({

        target,

        html: "src/components/dashboard/kpiRow/kpiRow.html",

        css: "src/components/dashboard/kpiRow/kpiRow.css"

    });

    const summary = getDashboardSummary();

    // Revenue

    await renderKPICard(

        document.getElementById("kpi-revenue"),

        {

            title: "Revenue",

            value: formatCompactCurrency(summary.revenue),

            icon: "indian-rupee",

            growth: summary.revenueGrowth,

            compareLabel: summary.previousPeriodLabel || "Previous Month"

        }

    );

    // Units Sold

    await renderKPICard(

        document.getElementById("kpi-units-sold"),

        {

            title: "Units Sold",

            value: formatNumber(summary.unitsSold),

            icon: "package",

            growth: summary.unitsGrowth,

            compareLabel: summary.previousPeriodLabel || "Previous Month"

        }

    );

    // Average Selling Price

    await renderKPICard(

        document.getElementById("kpi-avg-selling-price"),

        {

            title: "Avg Selling Price",

            value: formatCurrency(summary.avgSellingPrice),

            icon: "badge-indian-rupee",

            growth: summary.aspGrowth,

            compareLabel: summary.previousPeriodLabel || "Previous Month"

        }

    );

    // Sold Styles

    await renderKPICard(

        document.getElementById("kpi-sold-styles"),

        {

            title: "Sold Styles",

            value: formatNumber(summary.soldStyles),

            icon: "shirt",

            growth: summary.soldStylesGrowth,

            compareLabel: summary.previousPeriodLabel || "Previous Month"

        }

    );

}