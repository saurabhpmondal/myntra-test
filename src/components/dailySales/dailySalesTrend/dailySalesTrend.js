/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Daily Sales Trend
 * Version : V1.1
 * =====================================================
 */

import { getDailySales }
from "../../../services/dailySalesService.js";

export async function renderDailySalesTrend(

    target

){

    const rows=

        getDailySales()

        .filter(

            row=>row.date!=="TOTAL"

        );

    target.innerHTML=`

<div class="dashboard-card">

    <div class="card-header">

        <div>

            <h3>

                Daily Sales Trend

            </h3>

            <p>

                Units Sold & GMV by Day

            </p>

        </div>

    </div>

    <div

        id="dailySalesTrendChart"

        style="

            width:100%;

            height:420px;

        "

    >

    </div>

</div>

`;

    const chart=

        echarts.init(

            document.getElementById(

                "dailySalesTrendChart"

            )

        );

    chart.setOption({

        tooltip:{

            trigger:"axis",

            formatter(params){

                let html=

                    `<strong>${params[0].axisValue} Jul</strong><br><br>`;

                params.forEach(

                    item=>{

                        html+=`

${item.marker}

${item.seriesName}: ${Number(item.value).toLocaleString()}

<br>

`;

                    }

                );

                return html;

            }

        },

        legend:{

            top:10

        },

        grid:{

            left:50,

            right:30,

            top:60,

            bottom:40

        },

        xAxis:{

            type:"category",

            data:

                rows.map(

                    row=>row.date

                )

        },

        yAxis:[

            {

                type:"value",

                name:"Units"

            },

            {

                type:"value",

                name:"GMV"

            }

        ],

        series:[

            {

                name:"Units",

                type:"line",

                smooth:true,

                data:

                    rows.map(

                        row=>row.total

                    )

            },

            {

                name:"GMV",

                type:"line",

                smooth:true,

                yAxisIndex:1,

                data:

                    rows.map(

                        row=>row.gmv

                    )

            }

        ]

    });

    window.addEventListener(

        "resize",

        ()=>chart.resize()

    );

}