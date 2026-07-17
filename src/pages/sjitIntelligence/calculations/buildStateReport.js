/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : State Report Builder
 * Version : V1.0
 * =====================================================
 */

export function buildStateReport(

    salesRows

){

    const stateMap={};

    let totalSale=0;

    salesRows.forEach(

        row=>{

            const state=

                String(

                    row.state || ""

                ).trim();

            if(

                !state

            ){

                return;

            }

            const qty=

                Number(

                    row.qty || 0

                );

            totalSale+=qty;

            if(

                !stateMap[state]

            ){

                stateMap[state]={

                    state,

                    soldQty:0

                };

            }

            stateMap[state].soldQty+=qty;

        }

    );

    return Object.values(

        stateMap

    )

    .map(

        row=>({

            state:

                row.state,

            soldQty:

                row.soldQty,

            contribution:

                totalSale

                ?

                (

                    row.soldQty/

                    totalSale

                )*100

                :

                0

        })

    )

    .sort(

        (a,b)=>

            b.soldQty-

            a.soldQty

    );

}