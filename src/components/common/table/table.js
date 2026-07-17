/**
 * =====================================================
 * Project Phoenix
 * Product : Common Table Engine
 * Module  : Table Engine
 * Version : V2.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import {
    formatCurrency,
    formatCompactCurrency,
    formatNumber
} from "../../../utils/formatter.js";

import {
    createPagination,
    getVisibleRows,
    nextPage,
    previousPage,
    getPageInfo
} from "./pagination.js";

export async function renderTable(config){

    await createComponent({

        target: config.target,

        html: "src/components/common/table/table.html",

        css: "src/components/common/table/table.css",

        data:{

            title: config.title || "",

            subtitle: config.subtitle || ""

        }

    });

    const table = config.target.querySelector(".dashboard-card");

    renderHeader(
        table,
        config.columns || []
    );

    const pagination = createPagination(
        config.rows || []
    );

    renderPage(
        table,
        pagination,
        config
    );

    bindPagination(
        table,
        pagination,
        config
    );

}

function bindPagination(
    table,
    pagination,
    config
){

    const previous = table.querySelector(".table-previous");

    const next = table.querySelector(".table-next");

    if(previous){

        previous.onclick=()=>{

            previousPage(pagination);

            renderPage(
                table,
                pagination,
                config
            );

        };

    }

    if(next){

        next.onclick=()=>{

            nextPage(pagination);

            renderPage(
                table,
                pagination,
                config
            );

        };

    }

}

function renderPage(
    table,
    pagination,
    config
){

    const rows = getVisibleRows(
        pagination
    );

    renderBody(
        table,
        rows,
        config.columns || []
    );

    const info = getPageInfo(
        pagination
    );

    const label = table.querySelector(
        ".table-info"
    );

    if(label){

        label.style.display="block";

        label.textContent=

            `Showing ${info.start}-${info.end} of ${info.total} styles | Page ${info.page} of ${info.pages}`;

    }

}

function renderHeader(table, columns){

    const head = table.querySelector(".table-head");

    head.innerHTML = "";

    const tr = document.createElement("tr");

    columns.forEach(column=>{

        const th=document.createElement("th");

        th.textContent=column.label;

        th.className=`text-${column.align || "center"}`;

        tr.appendChild(th);

    });

    head.appendChild(tr);

}

function renderBody(
    table,
    rows,
    columns
){

    const body=table.querySelector(".table-body");

    body.innerHTML="";

    rows.forEach(record=>{

        const tr=document.createElement("tr");

        if(typeof record.__rowClass==="string"){

            tr.className=record.__rowClass;

        }

        columns.forEach(column=>{

            const td=document.createElement("td");

            td.className=`text-${column.align || "center"}`;

            const classKey=`__${column.key}`;

            if(record[classKey]){

                td.classList.add(
                    record[classKey]
                );

            }

            let value=record[column.key];

            if(typeof column.renderer==="function"){

                td.innerHTML=

                    column.renderer(

                        value,

                        record

                    );

            }

            else{

                switch(column.format){

                    case "currency":

                        value=formatCurrency(value);

                        break;

                    case "compactCurrency":

                        value=formatCompactCurrency(value);

                        break;

                    case "number":

                        value=formatNumber(value);

                        break;

                }

                td.textContent=value ?? "-";

            }

            tr.appendChild(td);

        });

        body.appendChild(tr);

    });

}