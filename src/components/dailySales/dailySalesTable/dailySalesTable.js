/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Daily Sales Table
 * Version : V1.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { getDailySales } from "../../../services/dailySalesService.js";

import {
    formatCompactCurrency,
    formatNumber
} from "../../../utils/formatter.js";

export async function renderDailySalesTable(target){

    await createComponent({

        target,

        html:"src/components/dailySales/dailySalesTable/dailySalesTable.html",

        css:"src/components/dailySales/dailySalesTable/dailySalesTable.css"

    });

    const data = getDailySales();

    renderTable(target,data);

}

function renderTable(target,data){

    const head = target.querySelector("#dailySalesHead");

    const body = target.querySelector("#dailySalesBody");

    head.innerHTML="";

    body.innerHTML="";

    // ----------------------------------------
    // Dynamic Brand List
    // ----------------------------------------

    const brands = new Set();

    data.forEach(row=>{

        Object.keys(row).forEach(key=>{

            if(

                [

                    "date",
                    "total",
                    "gmv",
                    "PPMP",
                    "SJIT",
                    "SOR"

                ].includes(key)

            ){

                return;

            }

            brands.add(key);

        });

    });

    const brandList=[...brands].sort();

    // ----------------------------------------
    // Header Row 1
    // ----------------------------------------

    const row1=document.createElement("tr");

    row1.innerHTML=`

        <th rowspan="2">Date</th>

        <th rowspan="2">Total</th>

        <th rowspan="2">GMV</th>

        <th colspan="3">PO TYPE</th>

        <th colspan="${brandList.length}">BRANDS</th>

    `;

    head.appendChild(row1);

    // ----------------------------------------
    // Header Row 2
    // ----------------------------------------

    const row2=document.createElement("tr");

    row2.innerHTML=`

        <th>PPMP</th>

        <th>SJIT</th>

        <th>SOR</th>

    `;

    brandList.forEach(brand=>{

        const th=document.createElement("th");

        th.textContent=brand;

        row2.appendChild(th);

    });

    head.appendChild(row2);

    // ----------------------------------------
    // Body
    // ----------------------------------------

    data.forEach(row=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`

            <td>${row.date}</td>

            <td class="text-right">${formatNumber(row.total)}</td>

            <td class="text-right">${formatCompactCurrency(row.gmv)}</td>

            <td class="text-right">${formatNumber(row.PPMP)}</td>

            <td class="text-right">${formatNumber(row.SJIT)}</td>

            <td class="text-right">${formatNumber(row.SOR)}</td>

        `;

        brandList.forEach(brand=>{

            const td=document.createElement("td");

            td.className="text-right";

            td.textContent=formatNumber(

                row[brand] || 0

            );

            tr.appendChild(td);

        });

        body.appendChild(tr);

    });

}
