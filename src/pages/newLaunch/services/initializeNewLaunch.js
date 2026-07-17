/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Initialize New Launch
 * Version : V2.0
 * =====================================================
 */

import {

    renderLayout

}

from "../renderers/renderLayout.js";

import {

    buildLaunchDataset

}

from "./launchBuilder.js";

import {

    NewLaunchStore,

    resetNewLaunchStore

}

from "./newLaunchStore.js";

import {

    refreshDashboard

}

from "./refreshDashboard.js";

import {

    bindFilters

}

from "./bindFilters.js";

import {

    applyFilters

}

from "./applyFilters.js";

/**
 * =====================================================
 * Initialize
 * =====================================================
 */

export async function initializeNewLaunch(

    target

){

    /**
     * ==========================================
     * Reset
     * ==========================================
     */

    resetNewLaunchStore();

    /**
     * ==========================================
     * Layout
     * ==========================================
     */

    await renderLayout(

        target

    );

    /**
     * ==========================================
     * Build Complete Launch Dataset
     * (Never Filtered)
     * ==========================================
     */

    NewLaunchStore.launchRowsAll=

        buildLaunchDataset(

            99999

        );

    /**
     * ==========================================
     * Working Dataset
     * ==========================================
     */

    NewLaunchStore.launchRows=[

        ...NewLaunchStore.launchRowsAll

    ];

    NewLaunchStore.filteredRows=[

        ...NewLaunchStore.launchRows

    ];

    /**
     * ==========================================
     * Status
     * ==========================================
     */

    NewLaunchStore.loaded=true;

    NewLaunchStore.generatedOn=

        new Date();

    /**
     * ==========================================
     * Apply Default Filters
     * (30 Days)
     * ==========================================
     */

    await applyFilters();

    /**
     * ==========================================
     * Render Dashboard
     * ==========================================
     */

    await refreshDashboard();

    /**
     * ==========================================
     * Bind Events
     * ==========================================
     */

    bindFilters();

}