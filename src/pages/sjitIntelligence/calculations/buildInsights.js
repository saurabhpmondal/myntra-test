/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Insight Builder
 * Version : V1.1
 * =====================================================
 */

export function buildInsights(

    fcReport,

    stateReport

){

    const insights=[];

    /**
     * ==========================================
     * Top Performing FC
     * ==========================================
     */

    if(fcReport.length){

        const topFC=fcReport[0];

        insights.push({

            type:"success",

            title:"Top Performing FC",

            message:
                `${topFC.fc} sold ${topFC.soldQty.toLocaleString()} units.`

        });

    }

    /**
     * ==========================================
     * Top Selling State
     * ==========================================
     */

    if(stateReport.length){

        const topState=stateReport[0];

        insights.push({

            type:"info",

            title:"Top Selling State",

            message:
                `${topState.state} contributed ${topState.contribution.toFixed(1)}% of SJIT sales.`

        });

    }

    /**
     * ==========================================
     * Biggest Stock Opportunity
     * ==========================================
     */

    if(fcReport.length){

        const opportunity=

            fcReport

            .slice()

            .sort(

                (a,b)=>

                    Math.abs(b.gap)-

                    Math.abs(a.gap)

            )[0];

        const type=

            opportunity.gap>=0

            ?

            "warning"

            :

            "danger";

        const action=

            opportunity.gap>=0

            ?

            "Demand is higher than stock allocation."

            :

            "Stock allocation is higher than demand.";

        insights.push({

            type,

            title:"Operational Alert",

            message:

                `${opportunity.fc} shows a ${Math.abs(opportunity.gap).toFixed(1)}% gap. ${action}`

        });

    }

    return insights;

}