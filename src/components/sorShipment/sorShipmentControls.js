/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SOR Shipment Controls
 * Version : V1.0
 * =====================================================
 */

import { createComponent } from "../../utils/createComponent.js";

import { generateShipment } from "../../services/sorShipment/sorShipmentService.js";

import {

    refreshSorShipmentReport,

    exportSorShipmentReport

} from "./sorShipmentReport.js";

export async function renderSorShipmentControls(target){

    await createComponent({

        target,

        html:"src/components/sorShipment/sorShipmentControls.html",

        css:"src/components/sorShipment/sorShipmentControls.css"

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

            await refreshSorShipmentReport();

            const actions =

                target.querySelector("#shipmentActions");

            if(actions){

                actions.style.display = "flex";

            }

        }

        catch(error){

            console.error(

                "SOR Shipment Generation Failed",

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

            exportSorShipmentReport();

        };

    }

}