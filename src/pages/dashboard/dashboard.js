/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Dashboard Page
 * Version : V1.4
 * =====================================================
 */

import { renderKPIRow } from "../../components/dashboard/kpiRow/kpiRow.js";
import { renderRevenueTrend } from "../../components/dashboard/revenueTrend/revenueTrend.js";
import { renderTopStyles } from "../../components/dashboard/topStyles/topStyles.js";
import { renderPOTypePerformance } from "../../components/dashboard/poType/poType.js";
import { renderBrandPerformance } from "../../components/dashboard/brand/brand.js";

let dashboardContainer = null;

/**
 * ==========================================
 * Initial Dashboard Render
 * ==========================================
 */

export async function renderDashboard(target){

    dashboardContainer = target;

    await refreshDashboard();

}

/**
 * ==========================================
 * Refresh Dashboard
 * ==========================================
 */

export async function refreshDashboard(){

    if(!dashboardContainer){

        console.warn("Dashboard container not found.");

        return;

    }

    dashboardContainer.innerHTML = "";

    // ======================================
    // KPI Row
    // ======================================

    const kpiSection = createSection();

    dashboardContainer.appendChild(kpiSection);

    await renderKPIRow(kpiSection);

    // ======================================
    // Revenue Trend
    // ======================================

    const revenueSection = createSection();

    dashboardContainer.appendChild(revenueSection);

    await renderRevenueTrend(revenueSection);

    // ======================================
    // PO Type Performance
    // ======================================

    const poTypeSection = createSection();

    dashboardContainer.appendChild(poTypeSection);

    await renderPOTypePerformance(poTypeSection);

    // ======================================
    // Brand Performance
    // ======================================

    const brandSection = createSection();

    dashboardContainer.appendChild(brandSection);

    await renderBrandPerformance(brandSection);

    // ======================================
    // Top 20 Styles
    // ======================================

    const topStyleSection = createSection();

    dashboardContainer.appendChild(topStyleSection);

    await renderTopStyles(topStyleSection);

    // ======================================
    // Day on Day Sales
    // ======================================

    // const dayOnDaySection = createSection();

    // dashboardContainer.appendChild(dayOnDaySection);

    // await renderDayOnDaySales(dayOnDaySection);

}

/**
 * ==========================================
 * Dashboard Section Factory
 * ==========================================
 */

function createSection(){

    const section = document.createElement("div");

    section.className = "dashboard-section";

    return section;

}