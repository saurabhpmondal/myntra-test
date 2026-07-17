/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index Service
 * Version : V3.0
 * =====================================================
 */

import { buildDemandIndex } from "./demandIndexBuilder.js";

import { DemandIndexStore } from "./demandIndexStore.js";

import { LookupStore } from "../../../services/lookupService.js";

import { renderHeader } from "../renderers/renderHeader.js";

import { renderFilters } from "../renderers/renderFilters.js";

import { renderKPIs } from "../renderers/renderKPIs.js";

import { renderTable } from "../renderers/renderTable.js";

/**
 * =====================================================
 * Initialize
 * =====================================================
 */

export async function initializeDemandIndex(

    target

){

    try{

        showLoader();

        const toDate=

            new Date();

        const fromDate=

            new Date();

        fromDate.setDate(

            toDate.getDate()-30

        );

        const rows=

            buildDemandIndex(

                fromDate,

                toDate

            );

        DemandIndexStore.rows=[

            ...rows

        ];

        DemandIndexStore.filteredRows=[

            ...rows

        ];

        await renderHeader(

            document.getElementById(

                "demandHeader"

            )

        );

        await renderFilters(

            document.getElementById(

                "demandFilters"

            )

        );

        populateFilters();

        bindFilters();

        await refreshScreen();

    }

    catch(error){

        console.error(

            "Demand Index",

            error

        );

    }

    finally{

        hideLoader();

    }

}

/**
 * =====================================================
 * Refresh Screen
 * =====================================================
 */

async function refreshScreen(){

    await renderKPIs(

        document.getElementById(

            "demandKPIs"

        ),

        DemandIndexStore.filteredRows

    );

    await renderTable(

        document.getElementById(

            "demandTable"

        ),

        DemandIndexStore.filteredRows

    );

    const empty=

        document.getElementById(

            "demandEmpty"

        );

    if(

        empty

    ){

        empty.style.display=

            DemandIndexStore.filteredRows.length

            ?

            "none"

            :

            "flex";

    }

}

/**
 * =====================================================
 * Loader
 * =====================================================
 */

function showLoader(){

    const loader=

        document.getElementById(

            "demandLoader"

        );

    if(loader){

        loader.style.display=

            "flex";

    }

}

function hideLoader(){

    const loader=

        document.getElementById(

            "demandLoader"

        );

    if(loader){

        loader.style.display=

            "none";

    }

}

/**
 * =====================================================
 * Populate Filters
 * =====================================================
 */

function populateFilters(){

    const brandFilter=

        document.getElementById(

            "diBrandFilter"

        );

    const categoryFilter=

        document.getElementById(

            "diCategoryFilter"

        );

    const statusFilter=

        document.getElementById(

            "diStatusFilter"

        );

    const badgeFilter=

        document.getElementById(

            "diBadgeFilter"

        );

    /**
     * ==========================================
     * Brand Filter
     * ==========================================
     */

    LookupStore.brands.forEach(

        brand=>{

            brandFilter.insertAdjacentHTML(

                "beforeend",

                `<option value="${brand}">${brand}</option>`

            );

        }

    );

    /**
     * ==========================================
     * Category Filter
     * ==========================================
     */

    LookupStore.categories.forEach(

        category=>{

            categoryFilter.insertAdjacentHTML(

                "beforeend",

                `<option value="${category}">${category}</option>`

            );

        }

    );

    /**
     * ==========================================
     * ERP Status Filter
     * ==========================================
     */

    LookupStore.erpStatuses.forEach(

        status=>{

            statusFilter.insertAdjacentHTML(

                "beforeend",

                `<option value="${status}">${status}</option>`

            );

        }

    );

    /**
     * ==========================================
     * Badge Filter
     * ==========================================
     */

    const badges=

        new Set();

    DemandIndexStore.rows.forEach(

        row=>{

            (row.badges||[]).forEach(

                badge=>{

                    badges.add(

                        badge

                    );

                }

            );

        }

    );

    [...badges]

    .sort()

    .forEach(

        badge=>{

            badgeFilter.insertAdjacentHTML(

                "beforeend",

                `<option value="${badge}">${badge}</option>`

            );

        }

    );

}

/**
 * =====================================================
 * Bind Filters
 * =====================================================
 */

function bindFilters(){

    document.getElementById(

        "diBrandFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    document.getElementById(

        "diCategoryFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    document.getElementById(

        "diStatusFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    document.getElementById(

        "diBadgeFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    document.getElementById(

        "diSearch"

    ).addEventListener(

        "input",

        applyFilters

    );

    document.getElementById(

        "diResetFilters"

    ).addEventListener(

        "click",

        resetFilters

    );

}

/**
 * =====================================================
 * Apply Filters
 * =====================================================
 */

async function applyFilters(){

    const brand=

        document.getElementById(

            "diBrandFilter"

        ).value;

    const category=

        document.getElementById(

            "diCategoryFilter"

        ).value;

    const status=

        document.getElementById(

            "diStatusFilter"

        ).value;

    const badge=

        document.getElementById(

            "diBadgeFilter"

        ).value;

    const keyword=

        document.getElementById(

            "diSearch"

        )

        .value

        .trim()

        .toLowerCase();

    DemandIndexStore.filteredRows=

        DemandIndexStore.rows.filter(

            row=>{

                if(

                    brand &&

                    row.brand!==brand

                ){

                    return false;

                }

                if(

                    category &&

                    row.category!==category

                ){

                    return false;

                }

                if(

                    status &&

                    row.erpStatus!==status

                ){

                    return false;

                }

                /**
                 * ==========================================
                 * Badge Filter
                 * ==========================================
                 */

                if(

                    badge &&

                    !(

                        row.badges || []

                    ).includes(

                        badge

                    )

                ){

                    return false;

                }

                /**
                 * ==========================================
                 * Search
                 * ==========================================
                 */

                if(

                    keyword

                ){

                    const styleId=

                        String(

                            row.styleId || ""

                        )

                        .toLowerCase();

                    const erpSku=

                        String(

                            row.erpSku || ""

                        )

                        .toLowerCase();

                    if(

                        !styleId.includes(

                            keyword

                        )

                        &&

                        !erpSku.includes(

                            keyword

                        )

                    ){

                        return false;

                    }

                }

                return true;

            }

        );

    await refreshScreen();

}

/**
 * =====================================================
 * Reset Filters
 * =====================================================
 */

function resetFilters(){

    document.getElementById(

        "diBrandFilter"

    ).value="";

    document.getElementById(

        "diCategoryFilter"

    ).value="";

    document.getElementById(

        "diStatusFilter"

    ).value="";

    document.getElementById(

        "diBadgeFilter"

    ).value="";

    document.getElementById(

        "diSearch"

    ).value="";

    applyFilters();

}