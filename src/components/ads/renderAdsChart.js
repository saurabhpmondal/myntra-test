/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Ads Chart
 * Version : V1.0
 * =====================================================
 */

export function renderAdsChart(

    target,

    chartData

){

    const chart = echarts.init(target);

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

            data:chartData.labels

        },

        yAxis:[

            {

                type:"value",

                name:"Revenue"

            },

            {

                type:"value",

                name:"Spend"

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

                data:

                    chartData.series[1].data

            },

            {

                name:"Spend",

                type:"line",

                smooth:true,

                yAxisIndex:1,

                data:

                    chartData.series[0].data

            },

            {

                name:"Units",

                type:"bar",

                yAxisIndex:2,

                data:

                    chartData.series[2].data

            }

        ]

    });

    window.addEventListener(

        "resize",

        ()=>chart.resize()

    );

}