/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Region Report Builder
 * Version : V1.0
 * =====================================================
 */

import {
    WarehouseMap
}
from "../../../config/warehouseMap.js";

export function buildRegionReport(

    salesRows

){

    const regionMap={};

    let totalSale=0;

    salesRows.forEach(

        row=>{

            const warehouse=

                WarehouseMap[

                    Number(

                        row.warehouse_id || 0

                    )

                ];

            if(

                !warehouse

            ){

                return;

            }

            const region=

                warehouse.region;

            const qty=

                Number(

                    row.qty || 0

                );

            totalSale+=qty;

            if(

                !regionMap[

                    region

                ]

            ){

                regionMap[

                    region

                ]={

                    region,

                    soldQty:0

                };

            }

            regionMap[

                region

            ].soldQty+=qty;

        }

    );

    return Object.values(

        regionMap

    )

    .map(

        row=>({

            region:

                row.region,

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