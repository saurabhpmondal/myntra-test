/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Shipment Columns
 * Version : V5.0
 * =====================================================
 */

export function getShipmentColumns(){

    return [

        {
            key:"styleId",
            label:"Style ID"
        },

        {
            key:"erpSku",
            label:"ERP SKU"
        },

        {
            key:"erpStatus",
            label:"ERP Status"
        },

        {
            key:"brand",
            label:"Brand"
        },

        {
            key:"launchDate",
            label:"Launch Date"
        },

        {
            key:"rating",
            label:"Rating",
            renderer:value=>
                Number(value||0).toFixed(1)
        },

        {
            key:"gross",
            label:"Gross",
            renderer:value=>
                Number(value||0).toLocaleString("en-IN")
        },

        {
            key:"returnPercent",
            label:"Return %",
            renderer:value=>
                `${Number(value||0).toFixed(2)}%`
        },

        {
            key:"net",
            label:"Net",
            renderer:value=>
                Number(value||0).toLocaleString("en-IN")
        },

        {
            key:"drr",
            label:"DRR",
            renderer:value=>
                Number(value||0).toFixed(2)
        },

        {
            key:"stock",
            label:"Stock",
            renderer:value=>
                Number(value||0).toLocaleString("en-IN")
        },

        {
            key:"sc",
            label:"SC",
            renderer:value=>
                Number(value||0).toFixed(2)
        },

        {
            key:"projection",
            label:"Projection",
            renderer:value=>
                Math.round(
                    Number(value||0)
                ).toLocaleString("en-IN")
        },

        {
            key:"shipment",
            label:"Shipment",
            renderer:value=>
                Number(value||0)
                .toLocaleString("en-IN")
        },

        {
            key:"recall",
            label:"Recall",
            renderer:value=>
                Number(value||0)
                .toLocaleString("en-IN")
        },

        {
            key:"remark",
            label:"Remark",
            align:"left"
        }

    ];

}