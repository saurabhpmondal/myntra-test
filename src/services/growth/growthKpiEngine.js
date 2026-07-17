/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Growth KPI Engine
 * Version : V1.0
 * =====================================================
 */

export function buildGrowthKpis(rows){

    const kpi={

        totalStyles:0,

        growing:0,

        degrowing:0,

        newAddition:0

    };

    rows.forEach(row=>{

        const current=Number(row.current||0);

        const previous=Number(row.previous||0);

        const growth=Number(row.growth||0);

        if(current>0){

            kpi.totalStyles++;

        }

        if(previous===0 && current>0){

            kpi.newAddition++;

            return;
        }

        if(growth>0){

            kpi.growing++;

        }
        else if(growth<0){

            kpi.degrowing++;

        }

    });

    return[

        {
            title:"Total Styles Sold",
            value:kpi.totalStyles,
            className:"primary"
        },

        {
            title:"Growing Styles",
            value:kpi.growing,
            className:"success"
        },

        {
            title:"Degrowing Styles",
            value:kpi.degrowing,
            className:"danger"
        },

        {
            title:"🟢 New Addition",
            value:kpi.newAddition,
            className:"info"
        }

    ];

}