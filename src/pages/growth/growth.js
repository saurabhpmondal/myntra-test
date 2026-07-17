/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Growth Page
 * Version : V1.0
 * =====================================================
 */

import { renderGrowth } from "../../components/growth/growth.js";

let growthContainer = null;

export async function renderGrowthPage(target){

    growthContainer = target;

    await refreshGrowth();

}

export async function refreshGrowth(){

    if(!growthContainer){

        return;

    }

    growthContainer.innerHTML = "";

    const section = document.createElement("div");

    section.className = "dashboard-section";

    growthContainer.appendChild(section);

    await renderGrowth(section);

}