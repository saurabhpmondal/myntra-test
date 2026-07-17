/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SOR Shipment Page
 * Version : V1.0
 * =====================================================
 */

import { renderSorShipmentControls } from "../../components/sorShipment/sorShipmentControls.js";
import { renderSorShipmentReport } from "../../components/sorShipment/sorShipmentReport.js";

let shipmentContainer = null;

export async function renderSorShipment(target){

    shipmentContainer = target;

    shipmentContainer.innerHTML = "";

    // ==========================================
    // Controls
    // ==========================================

    const controls = document.createElement("div");

    controls.className = "dashboard-section";

    shipmentContainer.appendChild(controls);

    await renderSorShipmentControls(controls);

    // ==========================================
    // Report
    // ==========================================

    const report = document.createElement("div");

    report.className = "dashboard-section";

    shipmentContainer.appendChild(report);

    await renderSorShipmentReport(report);

}