/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index Header
 * Version : V2.0
 * =====================================================
 */

import { DemandIndexStore } from "../services/demandIndexStore.js";

import { exportDemandIndex } from "../services/exportService.js";

export async function renderHeader(

    target

){

    target.innerHTML=`

<div class="di-header">

    <div class="di-header-left">

        <h1>

            Demand Index

        </h1>

        <p>

            Demand Intelligence for every Style.

        </p>

    </div>

    <div class="di-header-right">

        <button

            id="diExportButton"

            class="di-primary-btn">

            ⬇ Export

        </button>

    </div>

</div>

`;

    bindEvents();

}

/**
 * =====================================================
 * Events
 * =====================================================
 */

function bindEvents(){

    document

        .getElementById(

            "diExportButton"

        )

        .onclick=()=>{

            exportDemandIndex(

                DemandIndexStore.filteredRows

            );

        };

}