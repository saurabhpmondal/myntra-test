/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SJIT Intelligence
 * Version : V1.1
 * =====================================================
 */

import {

    initializeSJIT

}

from "./services/sjitIntelligenceService.js";

let pageContainer = null;

/**
 * =====================================================
 * Render
 * =====================================================
 */

export async function renderSJITIntelligence(

    target

){

    pageContainer = target;

    await initializeSJIT(

        pageContainer

    );

}

/**
 * =====================================================
 * Destroy
 * =====================================================
 */

export function destroySJITIntelligence(){

    /**
     * Reserved for future cleanup.
     *
     * Future:
     * - Dispose ECharts instances
     * - Remove event listeners
     * - Clear timers
     */

    pageContainer = null;

}

