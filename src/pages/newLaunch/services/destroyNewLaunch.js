/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Destroy New Launch
 * Version : V1.0
 * =====================================================
 */

import {

    destroyFilterBinding

}

from "./bindFilters.js";

import {

    resetNewLaunchStore

}

from "./newLaunchStore.js";

/**
 * =====================================================
 * Destroy New Launch
 * =====================================================
 */

export function destroyNewLaunch(){

    /**
     * ==========================================
     * Remove Filter Events
     * ==========================================
     */

    destroyFilterBinding();

    /**
     * ==========================================
     * Reset Store
     * ==========================================
     */

    resetNewLaunchStore();

}