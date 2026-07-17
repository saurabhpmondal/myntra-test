/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SOR Shipment Report
 * Version : V2.0
 * =====================================================
 */

import { createComponent } from "../../utils/createComponent.js";

import { renderTable } from "../common/table/table.js";

import { renderShipmentKpis } from "../shipment/shipmentKpis.js";

import { getShipmentData } from "../../services/sorShipment/sorShipmentService.js";

import { getShipmentColumns } from "../../services/sorShipment/sorShipmentColumns.js";

import { exportExcel } from "../../utils/exportExcel.js";

let reportTarget = null;

let reportRows = [];

let filteredRows = [];

export async function renderSorShipmentReport(target){

    reportTarget = target;

    await createComponent({

        target,

        html:"src/components/sorShipment/sorShipmentReport.html",

        css:"src/components/sorShipment/sorShipmentReport.css"

    });

}

export async function refreshSorShipmentReport(rows=null){

    if(!reportTarget){

        return;

    }

    if(rows===null){

        reportRows=[...getShipmentData()];

        filteredRows=[...reportRows];

    }

    else{

        filteredRows=[...rows];

    }

    await renderSorShipment();

}

async function renderSorShipment(){

    reportTarget.innerHTML=`

        <div id="shipmentKpiContainer"></div>

        <div id="shipmentTableContainer"></div>

    `;

    renderShipmentKpis(

        reportTarget.querySelector(

            "#shipmentKpiContainer"

        ),

        filteredRows,

        "Total SOR Stock"

    );

    await renderTable({

        target:reportTarget.querySelector(

            "#shipmentTableContainer"

        ),

        title:"SOR Shipment Recommendation",

        subtitle:`${filteredRows.length.toLocaleString("en-IN")} Styles`,

        columns:getShipmentColumns(),

        rows:filteredRows,

        pageSize:50

    });

}

export async function searchSorShipmentReport(keyword){

    const search=String(

        keyword||""

    )

    .trim()

    .toLowerCase();

    if(!search){

        filteredRows=[...reportRows];

        await renderSorShipment();

        return;

    }

    filteredRows=reportRows.filter(row=>{

        return(

            String(row.styleId||"")

                .toLowerCase()

                .includes(search)

            ||

            String(row.erpSku||"")

                .toLowerCase()

                .includes(search)

        );

    });

    await renderSorShipment();

}

export function exportSorShipmentReport(){

    if(!filteredRows.length){

        alert("No shipment data available.");

        return;

    }

    exportExcel({

        filename:"SOR Shipment Recommendation",

        columns:getShipmentColumns(),

        rows:filteredRows

    });

}