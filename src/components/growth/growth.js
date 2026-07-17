/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Growth Report
 * Version : V1.3
 * =====================================================
 */

import { renderTable } from "../common/table/table.js";
import { getGrowthReport } from "../../services/growth/growthService.js";
import { renderExportButton } from "../common/exportButton/exportButton.js";

export async function renderGrowth(target){

    const report = getGrowthReport();

    // =====================================
    // Load Growth CSS (Only Once)
    // =====================================

    if(!document.getElementById("growth-css")){

        const link = document.createElement("link");

        link.id = "growth-css";

        link.rel = "stylesheet";

        link.href = "src/components/growth/growth.css";

        document.head.appendChild(link);

    }

    target.innerHTML = "";

    // =====================================
    // PAGE CONTAINER
    // =====================================

    const page = document.createElement("div");

    page.className = "growth-page";

    target.appendChild(page);

    // =====================================
    // KPI SECTION
    // =====================================

    const kpiContainer = document.createElement("div");

    kpiContainer.className = "growth-kpi-grid";

    page.appendChild(kpiContainer);

    if(Array.isArray(report.kpis)){

        report.kpis.forEach(kpi=>{

            const card=document.createElement("div");

            card.className=`growth-kpi-card ${kpi.className}`;

            card.innerHTML=`

                <div class="growth-kpi-title">

                    ${kpi.title}

                </div>

                <div class="growth-kpi-value">

                    ${kpi.value}

                </div>

            `;

            kpiContainer.appendChild(card);

        });

    }

// =====================================
// ACTION BAR
// =====================================

const actionBar = document.createElement("div");

actionBar.className = "growth-action-bar";

page.appendChild(actionBar);

await renderExportButton({

    target: actionBar,

    filename: "Growth_Report",

    columns: report.columns,

    rows: report.rows

});


    // =====================================
    // TABLE SECTION
    // =====================================

    const tableContainer=document.createElement("div");

    page.appendChild(tableContainer);

    const columns=report.columns.map(column=>{

        if(column.key==="styleId"){

            return{

                ...column,

                renderer:(value,row)=>`

                    <a
                        href="${row.styleLink}"
                        target="_blank"
                        class="phoenix-style-link"
                    >
                        ${value}
                    </a>

                `

            };

        }

        if(column.key==="growth"){

            return{

                ...column,

                renderer:(value)=>{

                    if(value==="🟢 NEW"){

                        return`

                            <span class="growth-new-badge">

                                🟢 NEW

                            </span>

                        `;

                    }

                    return `${Number(value).toFixed(2)}%`;

                }

            };

        }

        if(column.key==="rating"){

            return{

                ...column,

                renderer:(value)=>

                    Number(value||0).toFixed(1)

            };

        }

        if(column.key==="drr"){

            return{

                ...column,

                renderer:(value)=>

                    Number(value||0).toFixed(2)

            };

        }

        return column;

    });

    await renderTable({

        target:tableContainer,

        title:"Growth Report",

        subtitle:"Style Wise Day Wise Sales Performance",

        columns,

        rows:report.rows

    });

}