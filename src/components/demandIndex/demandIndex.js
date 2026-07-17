/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index
 * Version : V1.1
 * =====================================================
 */

import { createComponent } from "../../utils/createComponent.js";

import { initializeDemandIndex } from "./services/demandIndexService.js";

/**
 * =====================================================
 * Render Demand Index
 * =====================================================
 */

export async function renderDemandIndex(

    target

){

    await createComponent({

        target,

        html:"src/pages/demandIndex/demandIndex.html",

        css:"src/pages/demandIndex/demandIndex.css"

    });

    await initializeDemandIndex(

        target

    );

}

/**
 * =====================================================
 * Loader
 * =====================================================
 */

export function showDemandLoader(){

    const loader=

        document.getElementById(

            "demandLoader"

        );

    if(loader){

        loader.style.display="flex";

    }

}

/**
 * =====================================================
 * Hide Loader
 * =====================================================
 */

export function hideDemandLoader(){

    const loader=

        document.getElementById(

            "demandLoader"

        );

    if(loader){

        loader.style.display="none";

    }

}

/**
 * =====================================================
 * Empty State
 * =====================================================
 */

export function showDemandEmpty(

    message="No data available."

){

    const empty=

        document.getElementById(

            "demandEmpty"

        );

    if(!empty){

        return;

    }

    empty.innerHTML=

        message;

    empty.style.display="flex";

}

/**
 * =====================================================
 * Hide Empty State
 * =====================================================
 */

export function hideDemandEmpty(){

    const empty=

        document.getElementById(

            "demandEmpty"

        );

    if(empty){

        empty.style.display="none";

    }

}