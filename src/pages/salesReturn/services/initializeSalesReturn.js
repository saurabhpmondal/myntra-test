/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Initialize Sales & Return
 * Version : V12.0
 * =====================================================
 */

import { resetSalesReturnStore } from "../store/salesReturnStore.js";

import { refreshDashboard } from "./refreshDashboard.js";

import { renderLayout } from "../renderers/renderLayout.js";

/**
 * =====================================================
 * Initialize
 * =====================================================
 */

export async function initializeSalesReturn(

    container

){

    /**
     * Reset Store
     */

    resetSalesReturnStore();

    /**
     * Render Layout
     */

    await renderLayout(

        container

    );

    /**
     * Load Data
     */

    await refreshDashboard();

}