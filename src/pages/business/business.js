/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Business Page
 * Version : V1.0
 * =====================================================
 */

import { renderMonthWiseUnits } from "../../components/business/monthWiseUnits/monthWiseUnits.js";
import { renderMonthWiseGMV } from "../../components/business/monthWiseGMV/monthWiseGMV.js";
import { renderMonthWiseASP } from "../../components/business/monthWiseASP/monthWiseASP.js";
import { renderFreshnessContribution } from "../../components/business/freshnessContribution/freshnessContribution.js";
import { renderLiveCount } from "../../components/business/liveCount/liveCount.js";

let businessContainer = null;

export async function renderBusiness(target){

    businessContainer = target;

    await refreshBusiness();

}

export async function refreshBusiness(){

    if(!businessContainer){

        return;

    }

    businessContainer.innerHTML = "";

    // ============================
    // Month Wise Units
    // ============================

    const units = createSection();

    businessContainer.appendChild(units);

    await renderMonthWiseUnits(units);

    // ============================
    // Month Wise GMV
    // ============================

    const gmv = createSection();

    businessContainer.appendChild(gmv);

    await renderMonthWiseGMV(gmv);

    // ============================
    // Month Wise ASP
    // ============================

    const asp = createSection();

    businessContainer.appendChild(asp);

    await renderMonthWiseASP(asp);

    // ============================
    // Freshness Contribution
    // ============================

    const freshness = createSection();

    businessContainer.appendChild(freshness);

    await renderFreshnessContribution(freshness);

    // ============================
    // Live Count
    // ============================

    const live = createSection();

    businessContainer.appendChild(live);

    await renderLiveCount(live);

}

function createSection(){

    const section = document.createElement("div");

    section.className = "dashboard-section";

    return section;

}