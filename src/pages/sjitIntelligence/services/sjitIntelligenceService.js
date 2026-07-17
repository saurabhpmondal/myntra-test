/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SJIT Intelligence Service
 * Version : V1.2
 * =====================================================
 */

import { renderLayout }
from "../renderers/renderLayout.js";

import { renderHeader }
from "../renderers/renderHeader.js";

import { renderKPIs }
from "../renderers/renderKPIs.js";

import { renderInsights }
from "../renderers/renderInsights.js";

import { renderMap }
from "../renderers/renderMap.js";

import { renderStockPie }
from "../renderers/renderStockPie.js";

import { renderFCReport }
from "../renderers/renderFCReport.js";

import { renderStateReport }
from "../renderers/renderStateReport.js";

import { renderRegionReport }
from "../renderers/renderRegionReport.js";

import { buildSJITData }
from "./sjitBuilder.js";

import {
    SJITStore,
    resetSJITStore
}
from "./sjitStore.js";

import { buildKPIs }
from "../calculations/buildKPIs.js";

import { buildInsights }
from "../calculations/buildInsights.js";

import { buildFCReport }
from "../calculations/buildFCReport.js";

import { buildStateReport }
from "../calculations/buildStateReport.js";

import { buildRegionReport }
from "../calculations/buildRegionReport.js";

import { buildMapData }
from "../calculations/buildMapData.js";

/**
 * =====================================================
 * Initialize
 * =====================================================
 */

export async function initializeSJIT(

    target

){

    resetSJITStore();

    await renderLayout(

        target

    );

    /**
     * ==========================================
     * Build Dataset
     * ==========================================
     */

    const {

        analysisFrom,

        analysisTo,

        salesRows,

        warehouseRows

    }=

    buildSJITData();

    SJITStore.rawSales=

        salesRows;

    SJITStore.warehouseRows=

        warehouseRows;

    /**
     * ==========================================
     * Calculations
     * ==========================================
     */

    SJITStore.kpis=

        buildKPIs(

            warehouseRows,

            salesRows

        );

    SJITStore.fcReport=

        buildFCReport(

            warehouseRows

        );

    SJITStore.stateReport=

        buildStateReport(

            salesRows

        );

    SJITStore.regionReport=

        buildRegionReport(

            salesRows

        );

    SJITStore.mapData=

        buildMapData(

            salesRows

        );

    SJITStore.insights=

        buildInsights(

            SJITStore.fcReport,

            SJITStore.stateReport

        );

    SJITStore.loaded=true;

    /**
     * ==========================================
     * Render
     * ==========================================
     */

    await renderHeader(

        document.getElementById(

            "sjitHeader"

        ),

        analysisFrom,

        analysisTo

    );

    await renderKPIs(

        document.getElementById(

            "sjitKPIs"

        ),

        SJITStore.kpis

    );

    await renderInsights(

        document.getElementById(

            "sjitInsights"

        ),

        SJITStore.insights

    );

    await renderMap(

        document.getElementById(

            "sjitMap"

        ),

        SJITStore.mapData

    );

    await renderStockPie(

        document.getElementById(

            "sjitPie"

        ),

        SJITStore.fcReport

    );

    await renderFCReport(

        document.getElementById(

            "sjitFCReport"

        ),

        SJITStore.fcReport

    );

    await renderStateReport(

        document.getElementById(

            "sjitStateReport"

        ),

        SJITStore.stateReport

    );

    await renderRegionReport(

        document.getElementById(

            "sjitRegionReport"

        ),

        SJITStore.regionReport

    );

}