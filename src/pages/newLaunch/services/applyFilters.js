/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Apply Filters
 * Version : V2.0
 * =====================================================
 */

import {

    NewLaunchStore

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

/**
 * =====================================================
 * Apply Filters
 * =====================================================
 */

export async function applyFilters(){

    /**
     * ==========================================
     * Read Filters
     * ==========================================
     */

    const{

        launchWindow,

        brand,

        status,

        search

    }=

    NewLaunchStore.filters;

    /**
     * ==========================================
     * Launch Window
     * ==========================================
     */

    NewLaunchStore.launchRows=

        NewLaunchStore

        .launchRowsAll

        .filter(

            row=>

                row.launchAge<=launchWindow

        );

    /**
     * ==========================================
     * Brand + Status + Search
     * ==========================================
     */

    NewLaunchStore.filteredRows=

        NewLaunchStore.launchRows.filter(

            row=>{

                if(

                    brand &&

                    row.brand!==brand

                ){

                    return false;

                }

                if(

                    status &&

                    row.status!==status

                ){

                    return false;

                }

                if(

                    search &&

                    !String(

                        row.styleId

                    )

                    .toLowerCase()

                    .includes(

                        search

                    )

                ){

                    return false;

                }

                return true;

            }

        );

    /**
     * ==========================================
     * Refresh Time
     * ==========================================
     */

    NewLaunchStore.generatedOn=

        new Date();

    /**
     * ==========================================
     * Refresh Dashboard
     * ==========================================
     */

    await refreshDashboard();

    /**
     * ==========================================
     * Header recreated
     * Re-bind events
     * ==========================================
     */

    bindFilters();

}