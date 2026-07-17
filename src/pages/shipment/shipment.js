/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Shipment Page
 * Version : V5.0
 * =====================================================
 */

import { renderShipmentControls } from "../../components/shipment/shipmentControls.js";
import { renderShipmentReport } from "../../components/shipment/shipmentReport.js";

let shipmentContainer = null;

export async function renderShipment(target){

    shipmentContainer = target;

    shipmentContainer.innerHTML = "";

    // ==========================================
    // Controls
    // ==========================================

    const controls = document.createElement("div");

    controls.className = "dashboard-section";

    shipmentContainer.appendChild(controls);

    await renderShipmentControls(controls);

    // ==========================================
    // Report
    // ==========================================

    const report = document.createElement("div");

    report.className = "dashboard-section";

    shipmentContainer.appendChild(report);

    await renderShipmentReport(report);

}