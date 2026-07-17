/**
 * =====================================================
 * Project Phoenix
 * Product : Common Component
 * Module  : Export Button
 * Version : V1.1
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";
import { exportExcel } from "../../../utils/exportExcel.js";

export async function renderExportButton({

    target,

    filename = "Report",

    columns = [],

    rows = []

}){

    await createComponent({

        target,

        html:"src/components/common/exportButton/exportButton.html",

        css:"src/components/common/exportButton/exportButton.css"

    });

    const button = target.querySelector(".phoenix-export-btn");

    if(!button){

        return;

    }

    button.addEventListener("click",()=>{

        exportExcel({

            filename,

            columns,

            rows

        });

    });

}