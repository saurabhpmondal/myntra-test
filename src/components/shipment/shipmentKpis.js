/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Shipment KPI Engine
 * Version : V1.0
 * =====================================================
 */

export function renderShipmentKpis(
    target,
    rows,
    stockLabel="Total Stock"
){

    if(!target){

        return;

    }

    const shipmentStyles =
        rows.filter(r=>r.shipment>0).length;

    const shipmentQty =
        rows.reduce(
            (a,b)=>a+Number(b.shipment||0),
            0
        );

    const recallStyles =
        rows.filter(r=>r.recall>0).length;

    const recallQty =
        rows.reduce(
            (a,b)=>a+Number(b.recall||0),
            0
        );

    const totalStock =
        rows.reduce(
            (a,b)=>a+Number(b.stock||0),
            0
        );

    target.innerHTML = `

<div class="shipment-kpi-grid">

<div class="dashboard-card shipment-kpi-card">

<div class="shipment-kpi-title">

Shipment Styles

</div>

<div class="shipment-kpi-value">

${shipmentStyles.toLocaleString("en-IN")}

</div>

</div>

<div class="dashboard-card shipment-kpi-card">

<div class="shipment-kpi-title">

Shipment Qty

</div>

<div class="shipment-kpi-value">

${shipmentQty.toLocaleString("en-IN")}

</div>

</div>

<div class="dashboard-card shipment-kpi-card">

<div class="shipment-kpi-title">

Recall Styles

</div>

<div class="shipment-kpi-value">

${recallStyles.toLocaleString("en-IN")}

</div>

</div>

<div class="dashboard-card shipment-kpi-card">

<div class="shipment-kpi-title">

Recall Qty

</div>

<div class="shipment-kpi-value">

${recallQty.toLocaleString("en-IN")}

</div>

</div>

<div class="dashboard-card shipment-kpi-card">

<div class="shipment-kpi-title">

${stockLabel}

</div>

<div class="shipment-kpi-value">

${totalStock.toLocaleString("en-IN")}

</div>

</div>

</div>

`;

}