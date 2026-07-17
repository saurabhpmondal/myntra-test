/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Daily Sales Page
 * Version : V1.3
 * =====================================================
 */

import { renderDailySalesTrend } from "../../components/dailySales/dailySalesTrend/dailySalesTrend.js";
import { renderDailySalesTable } from "../../components/dailySales/dailySalesTable/dailySalesTable.js";
import { renderProjectionSummary } from "../../components/dailySales/projectionSummary/projectionSummary.js";
import { renderBrandChannelPerformance } from "../../components/dailySales/brandChannelPerformance/brandChannelPerformance.js";

let pageContainer = null;

/**
 * ==========================================
 * Initial Render
 * ==========================================
 */

export async function renderDailySales(target){

    pageContainer = target;

    await refreshDailySales();

}

/**
 * ==========================================
 * Refresh Page
 * ==========================================
 */

export async function refreshDailySales(){

    if(!pageContainer){

        console.warn("Daily Sales container not found.");

        return;

    }

    pageContainer.innerHTML = "";

    // ======================================
    // Daily Sales Trend
    // ======================================

    const trendSection = createSection();

    pageContainer.appendChild(trendSection);

    await renderDailySalesTrend(trendSection);

    // ======================================
    // Daily Sales Table
    // ======================================

    const dailySalesSection = createSection();

    pageContainer.appendChild(dailySalesSection);

    await renderDailySalesTable(dailySalesSection);

    // ======================================
    // Projection Summary
    // ======================================

    const projectionSection = createSection();

    pageContainer.appendChild(projectionSection);

    await renderProjectionSummary(projectionSection);

    // ======================================
    // Brand Channel Performance
    // ======================================

    const brandChannelSection = createSection();

    pageContainer.appendChild(brandChannelSection);

    await renderBrandChannelPerformance(brandChannelSection);

}

/**
 * ==========================================
 * Section Factory... 
 * ==========================================
 */

function createSection(){

    const section = document.createElement("div");

    section.className = "dashboard-section";

    return section;

}