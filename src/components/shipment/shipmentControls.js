/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Shipment Controls
 * Version : V5.3
 * =====================================================
 */

import { createComponent } from "../../utils/createComponent.js";

import { generateShipment } from "../../services/shipment/shipmentService.js";

import {

    refreshShipmentReport,

    exportShipmentReport

} from "./shipmentReport.js";

export async function renderShipmentControls(target){

    await createComponent({

        target,

        html:"src/components/shipment/shipmentControls.html",

        css:"src/components/shipment/shipmentControls.css"

    });

    bindEvents(target);

}

function bindEvents(target){

    const generateButton =

        target.querySelector("#generateShipment");

    const exportButton =

        target.querySelector("#exportShipment");

    if(!generateButton){

        console.error("Generate Shipment button not found.");

        return;

    }

    generateButton.onclick = async ()=>{

        generateButton.disabled = true;

        generateButton.textContent =

            "Generating...";

        try{

            const config={

                saleDays:Number(

                    target.querySelector("#saleDays").value

                ),

                targetCover:Number(

                    target.querySelector("#targetCover").value

                ),

                recallTrigger:Number(

                    target.querySelector("#recallTrigger").value

                )

            };

            console.table(config);

            generateShipment(config);

            await refreshShipmentReport();

            const actions =

                target.querySelector("#shipmentActions");

            if(actions){

                actions.style.display = "flex";

            }

        }

        catch(error){

            console.error(

                "Shipment Generation Failed",

                error

            );

        }

        finally{

            generateButton.disabled = false;

            generateButton.textContent =

                "Generate Shipment";

        }

    };

    // ==========================================
    // Export
    // ==========================================

    if(exportButton){

        exportButton.onclick = ()=>{

            exportShipmentReport();

        };

    }

}