/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Style Eye Search
 * Version : V3.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { bindLandingEvents } from "./searchEvents.js";

/**
 * =====================================================
 * Render Style Search
 * =====================================================
 */

export async function renderStyleSearch(

    target

){

    await createComponent({

        target,

        html:"src/components/styleEye/search/styleSearch.html",

        css:"src/components/styleEye/search/styleSearch.css"

    });

    bindLandingEvents(

        target

    );

}