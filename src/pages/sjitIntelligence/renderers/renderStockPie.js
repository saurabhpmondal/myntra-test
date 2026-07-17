/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : FC Stock Distribution
 * Version : V1.2
 * =====================================================
 */

export async function renderStockPie(

    target,

    rows=[]

){

    target.innerHTML=`

<div class="dashboard-card">

    <div class="card-header">

        <div>

            <h3>

                FC Stock Distribution

            </h3>

            <p>

                Current SJIT Stock by Fulfilment Centre

            </p>

        </div>

    </div>

    <div

        id="sjitStockPie"

        style="
            width:100%;
            height:420px;
        "

    ></div>

</div>

`;

    const container=

        document.getElementById(

            "sjitStockPie"

        );

    if(

        !container

    ){

        return;

    }

    const oldChart=

        echarts.getInstanceByDom(

            container

        );

    if(

        oldChart

    ){

        oldChart.dispose();

    }

    const chart=

        echarts.init(

            container

        );

    chart.setOption({

        tooltip:{

            trigger:"item",

            formatter(params){

                return `

<strong>

${params.name}

</strong>

<br><br>

Stock :
${Number(

params.value

).toLocaleString()}

<br>

Contribution :
${params.percent.toFixed(1)}%

`;

            }

        },

        legend:{

            bottom:0,

            type:"scroll"

        },

        series:[

            {

                name:"Stock",

                type:"pie",

                radius:[

                    "45%",

                    "75%"

                ],

                avoidLabelOverlap:true,

                label:{

                    show:false

                },

                emphasis:{

                    label:{

                        show:true,

                        fontWeight:"bold"

                    }

                },

                data:

                    rows.map(

                        row=>({

                            name:

                                row.fc ||

                                row.shortName ||

                                row.warehouseName ||

                                "Unknown",

                            value:

                                Number(

                                    row.stock || 0

                                )

                        })

                    )

            }

        ]

    });

    window.addEventListener(

        "resize",

        ()=>chart.resize()

    );

}