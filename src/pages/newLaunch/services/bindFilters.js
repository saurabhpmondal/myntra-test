/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Bind Filters
 * Version : V1.0
 * =====================================================
 */

import {

    NewLaunchStore

}

from "./newLaunchStore.js";

import {

    applyFilters

}

from "./applyFilters.js";

let debounceTimer=null;

/**
 * =====================================================
 * Bind Filters
 * =====================================================
 */

export function bindFilters(){

    const launchWindow=

        document.getElementById(

            "nlLaunchWindow"

        );

    const brand=

        document.getElementById(

            "nlBrand"

        );

    const status=

        document.getElementById(

            "nlStatus"

        );

    const search=

        document.getElementById(

            "nlSearch"

        );

    if(

        !launchWindow ||

        !brand ||

        !status ||

        !search

    ){

        return;

    }

    /**
     * ==========================================
     * Restore Values
     * ==========================================
     */

    launchWindow.value=

        String(

            NewLaunchStore

            .filters

            .launchWindow

        );

    brand.value=

        NewLaunchStore

        .filters

        .brand;

    status.value=

        NewLaunchStore

        .filters

        .status;

    search.value=

        NewLaunchStore

        .filters

        .search;

    /**
     * ==========================================
     * Launch Window
     * ==========================================
     */

    launchWindow.onchange=

        async()=>{

            NewLaunchStore

            .filters

            .launchWindow=

                Number(

                    launchWindow.value

                );

            await applyFilters();

        };

    /**
     * ==========================================
     * Brand
     * ==========================================
     */

    brand.onchange=

        async()=>{

            NewLaunchStore

            .filters

            .brand=

                brand.value;

            await applyFilters();

        };

    /**
     * ==========================================
     * Status
     * ==========================================
     */

    status.onchange=

        async()=>{

            NewLaunchStore

            .filters

            .status=

                status.value;

            await applyFilters();

        };

    /**
     * ==========================================
     * Search
     * ==========================================
     */

    search.oninput=()=>{

        clearTimeout(

            debounceTimer

        );

        debounceTimer=

            setTimeout(

                async()=>{

                    NewLaunchStore

                    .filters

                    .search=

                        search.value

                        .trim()

                        .toLowerCase();

                    await applyFilters();

                },

                300

            );

    };

}

/**
 * =====================================================
 * Destroy
 * =====================================================
 */

export function destroyFilterBinding(){

    clearTimeout(

        debounceTimer

    );

    debounceTimer=null;

}