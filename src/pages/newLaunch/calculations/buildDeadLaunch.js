/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Dead Launch Builder
 * Version : V1.0
 * =====================================================
 */

export function buildDeadLaunch(

    launchRows=[]

){

    return launchRows

    .filter(

        row=>

            Number(

                row.units||0

            )===0

    )

    .sort(

        (a,b)=>

            b.launchAge-

            a.launchAge

    )

    .map(

        row=>({

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

            daysWithoutSale:

                row.launchAge

        })

    );

}