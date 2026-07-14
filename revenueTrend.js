/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Revenue Trend
 * Version : V1.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { getRevenueTrendData } from "../../../services/revenueTrendService.js";

import {
    formatCompactCurrency,
    formatNumber
} from "../../../utils/formatter.js";

export async function renderRevenueTrend(target){

    await createComponent({

        target,

        html:"src/components/dashboard/revenueTrend/revenueTrend.html",

        css:"src/components/dashboard/revenueTrend/revenueTrend.css"

    });

    const trend = getRevenueTrendData();

    renderSummary(trend.summary);

    renderChart(trend.data);

}

function renderSummary(summary){

    document.getElementById("highestRevenue").textContent =

        `${formatCompactCurrency(summary.highestRevenue.revenue)}
 (${summary.highestRevenue.label})`;

    document.getElementById("highestUnits").textContent =

        `${formatNumber(summary.highestUnits.units)}
 (${summary.highestUnits.label})`;

    document.getElementById("avgRevenueDRR").textContent =

        formatCompactCurrency(summary.averageRevenueDRR);

    document.getElementById("avgUnitsDRR").textContent =

        formatNumber(summary.averageUnitsDRR);

}

function renderChart(data){

    const chart = echarts.init(

        document.getElementById("revenueTrendChart")

    );

    chart.setOption({

        tooltip:{

            trigger:"axis"

        },

        legend:{

            top:0

        },

        grid:{

            left:60,

            right:60,

            bottom:40,

            top:50

        },

        xAxis:{

            type:"category",

            data:data.map(

                x=>x.label

            )

        },

        yAxis:[

            {

                type:"value",

                name:"Revenue"

            },

            {

                type:"value",

                name:"Units"

            }

        ],

        series:[

            {

                name:"Revenue",

                type:"line",

                smooth:true,

                data:data.map(

                    x=>x.revenue

                )

            },

            {

                name:"Units",

                type:"line",

                smooth:true,

                yAxisIndex:1,

                data:data.map(

                    x=>x.units

                )

            }

        ]

    });

    window.addEventListener(

        "resize",

        ()=>chart.resize()

    );

}