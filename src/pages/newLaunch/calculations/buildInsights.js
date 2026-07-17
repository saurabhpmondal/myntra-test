/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : New Launch Insights Builder
 * Version : V1.0
 * =====================================================
 */

import {

    formatCurrency,

    formatNumber

}

from "../../../utils/formatter.js";

export function buildInsights(

    launchRows=[],

    kpis={}

){

    const insights=[];

    /**
     * ==========================================
     * Best Launch
     * ==========================================
     */

    const bestLaunch=

        launchRows

        .slice()

        .sort(

            (a,b)=>

                b.revenue-

                a.revenue

        )[0];

    if(bestLaunch){

        insights.push({

            title:"🚀 Best Launch",

            value:

                bestLaunch.styleId,

            description:

                `${formatNumber(bestLaunch.units)} Units • ${formatCurrency(bestLaunch.revenue)}`

        });

    }

    /**
     * ==========================================
     * Best Brand
     * ==========================================
     */

    const brandMap={};

    launchRows.forEach(

        row=>{

            if(

                !brandMap[

                    row.brand

                ]

            ){

                brandMap[

                    row.brand

                ]={

                    revenue:0,

                    units:0

                };

            }

            brandMap[

                row.brand

            ].revenue+=

                row.revenue;

            brandMap[

                row.brand

            ].units+=

                row.units;

        }

    );

    const bestBrand=

        Object.entries(

            brandMap

        )

        .sort(

            (a,b)=>

                b[1].revenue-

                a[1].revenue

        )[0];

    if(bestBrand){

        insights.push({

            title:"🏆 Best Brand",

            value:

                bestBrand[0],

            description:

                `${formatCurrency(bestBrand[1].revenue)}`

        });

    }

    /**
     * ==========================================
     * Dead Launches
     * ==========================================
     */

    insights.push({

        title:"💀 Dead Launches",

        value:

            formatNumber(

                kpis.deadLaunches||0

            ),

        description:

            "Styles with Zero Sales"

    });

    /**
     * ==========================================
     * Avg Revenue
     * ==========================================
     */

    const avgRevenue=

        kpis.totalLaunches

        ?

        kpis.revenue/

        kpis.totalLaunches

        :

        0;

    insights.push({

        title:"💰 Avg Revenue",

        value:

            formatCurrency(

                avgRevenue

            ),

        description:

            "Per Launch"

    });

    /**
     * ==========================================
     * Avg Units
     * ==========================================
     */

    const avgUnits=

        kpis.totalLaunches

        ?

        kpis.unitsSold/

        kpis.totalLaunches

        :

        0;

    insights.push({

        title:"📦 Avg Units",

        value:

            avgUnits.toFixed(

                1

            ),

        description:

            "Per Launch"

    });

    /**
     * ==========================================
     * Success Rate
     * ==========================================
     */

    insights.push({

        title:"📊 Success Rate",

        value:

            `${(

                kpis.successRate||0

            ).toFixed(1)}%`,

        description:

            "Sold Styles ÷ New Launches"

    });

    return insights;

}