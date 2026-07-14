/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Page Manager
 * Version : V2.3
 * =====================================================
 */

import { renderDashboard } from "../pages/dashboard/dashboard.js";

import { renderDailySales } from "../pages/dailySales/dailySales.js";

import { renderBusiness } from "../pages/business/business.js";

import { renderGrowthPage } from "../pages/growth/growth.js";

import { renderShipment } from "../pages/shipment/shipment.js";

import { renderSorShipment } from "../pages/sorShipment/sorShipment.js";

import {
    renderStyleEye,
    destroyStyleEye
} from "../pages/styleEye/styleEye.js";

import {
    renderDemandIndex
} from "../pages/demandIndex/demandIndex.js";

import {
    renderSJITIntelligence,
    destroySJITIntelligence
} from "../pages/sjitIntelligence/sjitIntelligence.js";

import {
    renderNewLaunch,
    destroyNewLaunch
} from "../pages/newLaunch/newLaunch.js";

import {
    renderSalesReturn,
    destroySalesReturn
} from "../pages/salesReturn/salesReturn.js";

import {
    renderAds
} from "../components/ads/ads.js";

let content = null;

let currentPage = "dashboard";

/**
 * =====================================================
 * Initialize
 * =====================================================
 */

export function initializePageManager(container){

    content = container;

}

/**
 * =====================================================
 * Current Page
 * =====================================================
 */

export function getCurrentPage(){

    return currentPage;

}

/**
 * =====================================================
 * Refresh
 * =====================================================
 */

export async function refreshCurrentPage(){

    await openPage(currentPage);

}

/**
 * =====================================================
 * Open Page
 * =====================================================
 */

export async function openPage(page){

    if(!content){

        console.error(
            "Page Manager not initialized."
        );

        return;

    }

    /**
     * ==========================================
     * Cleanup
     * ==========================================
     */

    switch(currentPage){

        case "style-eye":

            destroyStyleEye();

            break;

        case "sjit-intelligence":

            destroySJITIntelligence();

            break;

        case "new-launch":

            destroyNewLaunch();

            break;

        case "sales-return":

            destroySalesReturn();

            break;

        default:

            break;

    }

    currentPage = page;

    switch(page){

        case "dashboard":

            await renderDashboard(content);

            break;

        case "daily-sales":

            await renderDailySales(content);

            break;

        case "sales-return":

            await renderSalesReturn(content);

            break;

        case "business":

            await renderBusiness(content);

            break;

        case "growth":

            await renderGrowthPage(content);

            break;

        case "shipment":

            await renderShipment(content);

            break;

        case "sor-shipment":

            await renderSorShipment(content);

            break;

        case "new-launch":

            await renderNewLaunch(content);

            break;

        case "sjit-intelligence":

            await renderSJITIntelligence(content);

            break;

        case "style-eye":

            await renderStyleEye(content);

            break;

        case "demand-index":

            await renderDemandIndex(content);

            break;

        case "ads":

            await renderAds(content);

            break;

        case "surge":

        case "sales-drop":

            comingSoon(page);

            break;

        default:

            await renderDashboard(content);

            break;

    }

}

/**
 * =====================================================
 * Coming Soon
 * =====================================================
 */

function comingSoon(page){

    const title = page
        .split("-")
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

    content.innerHTML = `

<div class="dashboard-card" style="padding:60px;text-align:center;">

    <h2>${title}</h2>

    <p>This module is under development.</p>

</div>

`;

}