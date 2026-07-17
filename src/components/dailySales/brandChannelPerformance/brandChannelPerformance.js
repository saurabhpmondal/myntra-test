/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Brand Channel Performance
 * Version : V2.1
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";
import { getBrandChannelPerformance } from "../../../services/brandChannelPerformanceService.js";
import { formatNumber } from "../../../utils/formatter.js";

export async function renderBrandChannelPerformance(target){

    await createComponent({

        target,

        html:"src/components/dailySales/brandChannelPerformance/brandChannelPerformance.html",

        css:"src/components/dailySales/brandChannelPerformance/brandChannelPerformance.css"

    });

    renderTable(target);

}

function renderTable(target){

    const body = target.querySelector(".brand-channel-body");

    body.innerHTML = "";

    const data = getBrandChannelPerformance();

    data.forEach(row=>{

        const tr = document.createElement("tr");

        if(row.brand==="TOTAL"){

            tr.classList.add("grand-total");

        }

        tr.innerHTML = `

            <td>${row.brand}</td>

            <td>${formatNumber(row.stockSOR)}</td>

            <td>${formatNumber(row.stockSJIT)}</td>

            <td>${formatNumber(row.saleSOR)}</td>

            <td>${formatNumber(row.saleSJIT)}</td>

            <td>${formatNumber(row.salePPMP)}</td>

            <td>${formatNumber(row.totalSale)}</td>

            <td>${row.shareSOR.toFixed(1)}%</td>

            <td>${row.shareSJIT.toFixed(1)}%</td>

            <td>${row.sharePPMP.toFixed(1)}%</td>

            <td>${row.drrSOR.toFixed(1)}</td>

            <td>${row.drrSJIT.toFixed(1)}</td>

            <td>${row.drrPPMP.toFixed(1)}</td>

        `;

        body.appendChild(tr);

    });

}