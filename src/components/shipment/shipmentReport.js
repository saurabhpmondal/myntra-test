/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Shipment Report
 * Version : V5.2
 * =====================================================
 */

import { createComponent } from "../../utils/createComponent.js";

import { renderTable } from "../common/table/table.js";

import { getShipmentData } from "../../services/shipment/shipmentService.js";

import { getShipmentColumns } from "../../services/shipment/shipmentColumns.js";

import { exportExcel } from "../../utils/exportExcel.js";

let reportTarget = null;

/**
 * Master dataset
 */

let reportRows = [];

/**
 * Current filtered dataset
 */

let filteredRows = [];

/**
 * ==========================================
 * Render
 * ==========================================
 */

export async function renderShipmentReport(target){

    reportTarget = target;

    await createComponent({

        target,

        html:"src/components/shipment/shipmentReport.html",

        css:"src/components/shipment/shipmentReport.css"

    });

}

/**
 * ==========================================
 * Refresh Report
 * ==========================================
 */

export async function refreshShipmentReport(rows = null){

    if(!reportTarget){

        return;

    }

    if(rows===null){

        reportRows = [...getShipmentData()];

        filteredRows = [...reportRows];

    }

    else{

        filteredRows = [...rows];

    }

    await renderShipmentTable();

}

/**
 * ==========================================
 * Render Table
 * ==========================================
 */

async function renderShipmentTable(){

    reportTarget.innerHTML = "";

    await renderTable({

        target:reportTarget,

        title:"SJIT Shipment Recommendation",

        subtitle:`${filteredRows.length.toLocaleString("en-IN")} Styles`,

        columns:getShipmentColumns(),

        rows:filteredRows,

        pageSize:50

    });

}

/**
 * ==========================================
 * Get Current Rows
 * ==========================================
 */

export function getFilteredShipmentRows(){

    return [...filteredRows];

}

/**
 * ==========================================
 * Search Shipment Report
 * ==========================================
 */

export async function searchShipmentReport(keyword){

    const search = String(

        keyword || ""

    )

    .trim()

    .toLowerCase();

    // Empty Search
    if(!search){

        filteredRows = [...reportRows];

        await renderShipmentTable();

        return;

    }

    // Filter
    filteredRows = reportRows.filter(row=>{

        const styleId = String(

            row.styleId || ""

        ).toLowerCase();

        const erpSku = String(

            row.erpSku || ""

        ).toLowerCase();

        return(

            styleId.includes(search) ||

            erpSku.includes(search)

        );

    });

    await renderShipmentTable();

}

/**
 * ==========================================
 * Export Shipment Report
 * ==========================================
 */

/**
 * ==========================================
 * Export Shipment Report
 * ==========================================
 */

export function exportShipmentReport(){

    if(!filteredRows.length){

        alert("No shipment data available.");

        return;

    }

    exportExcel({

        filename:"SJIT Shipment Recommendation",

        columns:getShipmentColumns(),

        rows:filteredRows

    });

}