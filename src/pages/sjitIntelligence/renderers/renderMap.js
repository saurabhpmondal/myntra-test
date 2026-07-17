/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : India Heat Map
 * Version : V3.0
 * =====================================================
 */

import {

    registerIndiaMap

}

from "../services/mapService.js";

let chart=null;

export async function renderMap(

    target,

    data=[]

){

    if(!target){

        return;

    }

    await registerIndiaMap();

    if(chart){

        chart.dispose();

    }

    chart=

        echarts.init(

            target

        );

    const maxValue=

        Math.max(

            ...data.map(

                row=>

                    Number(

                        row.value||0

                    )

            ),

            1

        );

    chart.setOption({

        backgroundColor:"#ffffff",

        tooltip:{

            trigger:"item",

            formatter(params){

                const value=

                    Number(

                        params.value||0

                    );

                return `

<div style="padding:6px;min-width:160px;">

<div style="font-size:14px;font-weight:600;margin-bottom:6px;">

${params.name}

</div>

<div>

Units Sold :

<b>${value.toLocaleString()}</b>

</div>

</div>

`;

            }

        },

        visualMap:{

            min:0,

            max:maxValue,

            left:20,

            bottom:20,

            calculable:true,

            orient:"vertical",

            text:[

                "High",

                "Low"

            ],

            inRange:{

                color:[

                    "#FFF5F7",

                    "#FFD6DF",

                    "#FF9CB2",

                    "#FF6B95",

                    "#E91E63"

                ]

            }

        },

        series:[

            {

                name:"SJIT Sales",

                type:"map",

                map:"India",

                roam:true,

                zoom:1.15,

                scaleLimit:{

                    min:1,

                    max:8

                },

                selectedMode:false,

                label:{

                    show:false

                },

                emphasis:{

                    label:{

                        show:true,

                        color:"#111827",

                        fontWeight:"bold"

                    },

                    itemStyle:{

                        borderColor:"#ffffff",

                        borderWidth:1.5

                    }

                },

                itemStyle:{

                    borderColor:"#ffffff",

                    borderWidth:0.8

                },

                data

            }

        ]

    });

    chart.off("click");

    chart.on(

        "click",

        params=>{

            console.log(

                "State Selected :",

                params.name,

                params.value

            );

        }

    );

    window.addEventListener(

        "resize",

        ()=>{

            if(chart){

                chart.resize();

            }

        }

    );

}