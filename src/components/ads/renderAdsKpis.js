/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Ads KPI Renderer
 * Version : V1.0
 * =====================================================
 */

import { renderKPICard } from "../kpiCard/kpiCard.js";

export async function renderAdsKpis(

    target,

    cards

){

    target.innerHTML="";

    for(const card of cards){

        const div=

            document.createElement("div");

        target.appendChild(div);

        await renderKPICard(

            div,

            card

        );

    }

}