/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Projection Summary
 * Version : V1.1
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";
import { getProjectionSummary } from "../../../services/projectionSummaryService.js";
import {
    formatCompactCurrency,
    formatNumber
} from "../../../utils/formatter.js";

export async function renderProjectionSummary(target){

    await createComponent({

        target,

        html:"src/components/dailySales/projectionSummary/projectionSummary.html",

        css:"src/components/dailySales/projectionSummary/projectionSummary.css"

    });

    const summary = getProjectionSummary();

    renderTable(target,summary);

}

function renderTable(target,summary){

    const head = target.querySelector(".projection-head");

    const body = target.querySelector(".projection-body");

    head.innerHTML = "";

    body.innerHTML = "";

    const brands = Object.keys(summary.brands).sort();

    const currentMonth =
        summary.total.month ||
        summary.currentMonth ||
        "Current";

    const previousMonth =
        summary.previousPeriod ||
        "Previous";

    const header = document.createElement("tr");

    header.innerHTML=`

        <th>Period</th>

        <th>Total</th>

        <th>GMV</th>

        <th>PPMP</th>

        <th>SJIT</th>

        <th>SOR</th>

    `;

    brands.forEach(brand=>{

        const th=document.createElement("th");

        th.textContent=brand;

        header.appendChild(th);

    });

    head.appendChild(header);

    addProjectionRow(
        body,
        brands,
        `${currentMonth} (MTD)`,
        summary,
        "actual"
    );

    addProjectionRow(
        body,
        brands,
        `${currentMonth} (PDS)`,
        summary,
        "drr"
    );

    addProjectionRow(
        body,
        brands,
        `${currentMonth} (PROJECTION)`,
        summary,
        "projected"
    );

    addPreviousRow(
        body,
        brands,
        previousMonth,
        summary
    );

    addStatusRow(
        body,
        brands,
        summary
    );

}

function addProjectionRow(body,brands,label,summary,key){

    const row=document.createElement("tr");

    row.innerHTML=`

        <td>${label}</td>

        <td>${formatNumber(summary.total[key])}</td>

        <td>${formatCompactCurrency(summary.gmv[key])}</td>

        <td>${formatNumber(summary.ppmp[key])}</td>

        <td>${formatNumber(summary.sjit[key])}</td>

        <td>${formatNumber(summary.sor[key])}</td>

    `;

    brands.forEach(brand=>{

        const td=document.createElement("td");

        td.textContent=formatNumber(

            summary.brands[brand][key]

        );

        row.appendChild(td);

    });

    body.appendChild(row);

}

function addPreviousRow(body,brands,label,summary){

    const row=document.createElement("tr");

    row.innerHTML=`

        <td>${label}</td>

        <td>${formatNumber(summary.previous.total)}</td>

        <td>${formatCompactCurrency(summary.previous.gmv)}</td>

        <td>${formatNumber(summary.previous.ppmp)}</td>

        <td>${formatNumber(summary.previous.sjit)}</td>

        <td>${formatNumber(summary.previous.sor)}</td>

    `;

    brands.forEach(brand=>{

        const td=document.createElement("td");

        td.textContent=formatNumber(

            summary.previous.brands[brand]||0

        );

        row.appendChild(td);

    });

    body.appendChild(row);

}

function addStatusRow(body,brands,summary){

    const status=(current,previous)=>{

        if(previous===0) return "-";

        return ((current-previous)/previous*100).toFixed(1)+"%";

    };

    const row=document.createElement("tr");

    row.innerHTML=`

        <td><b>STATUS</b></td>

        <td>${status(summary.total.projected,summary.previous.total)}</td>

        <td>${status(summary.gmv.projected,summary.previous.gmv)}</td>

        <td>${status(summary.ppmp.projected,summary.previous.ppmp)}</td>

        <td>${status(summary.sjit.projected,summary.previous.sjit)}</td>

        <td>${status(summary.sor.projected,summary.previous.sor)}</td>

    `;

    brands.forEach(brand=>{

        const td=document.createElement("td");

        td.textContent=status(

            summary.brands[brand].projected,

            summary.previous.brands[brand]||0

        );

        row.appendChild(td);

    });

    body.appendChild(row);

}