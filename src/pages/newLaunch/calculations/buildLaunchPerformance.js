/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Launch Performance Builder
 * Version : V1.0
 * =====================================================
 */

export function buildLaunchPerformance(

    launchRows=[]

){

    /**
     * ==========================================
     * Revenue Ranking
     * ==========================================
     */

    const rankedRows=

        launchRows

        .slice()

        .sort(

            (a,b)=>

                b.revenue-

                a.revenue

        );

    const totalSold=

        rankedRows.filter(

            row=>

                row.units>0

        ).length;

    const hotLimit=

        Math.ceil(

            totalSold*0.20

        );

    const goodLimit=

        Math.ceil(

            totalSold*0.50

        );

    /**
     * ==========================================
     * Build Report
     * ==========================================
     */

    let soldRank=0;

    const report=

        rankedRows.map(

            row=>{

                let status=

                    "🔴 Dead";

                if(

                    row.units>0

                ){

                    soldRank++;

                    if(

                        soldRank<=hotLimit

                    ){

                        status=

                            "🚀 Hot";

                    }

                    else if(

                        soldRank<=goodLimit

                    ){

                        status=

                            "🟢 Good";

                    }

                    else{

                        status=

                            "🟡 Slow";

                    }

                }

                return{

                    styleId:

                        row.styleId,

                    brand:

                        row.brand,

                    launchDate:

                        row.launchDate,

                    launchAge:

                        row.launchAge,

                    units:

                        row.units,

                    revenue:

                        row.revenue,

                    orders:

                        row.orders,

                    asp:

                        row.asp,

                    status

                };

            }

        );

    return report;

}