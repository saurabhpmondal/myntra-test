/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : New Launch KPI Builder
 * Version : V1.0
 * =====================================================
 */

export function buildKPIs(

    launchRows=[]

){

    const totalLaunches=

        launchRows.length;

    const soldStyles=

        launchRows.filter(

            row=>

                row.units>0

        ).length;

    const deadLaunches=

        totalLaunches-

        soldStyles;

    const unitsSold=

        launchRows.reduce(

            (sum,row)=>

                sum+

                Number(

                    row.units||0

                ),

            0

        );

    const revenue=

        launchRows.reduce(

            (sum,row)=>

                sum+

                Number(

                    row.revenue||0

                ),

            0

        );

    const successRate=

        totalLaunches

        ?

        (

            soldStyles/

            totalLaunches

        )*100

        :

        0;

    return{

        totalLaunches,

        soldStyles,

        deadLaunches,

        unitsSold,

        revenue,

        successRate

    };

}