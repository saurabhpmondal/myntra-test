/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SJIT Builder
 * Version : V1.2
 * =====================================================
 */

import { DataStore }
from "../../../services/dataService.js";

import {
    WarehouseMap
}
from "../../../config/warehouseMap.js";

import {
    IntelligenceConfig
}
from "../../../config/intelligence.js";

const MonthMap={

    JAN:0,
    FEB:1,
    MAR:2,
    APR:3,
    MAY:4,
    JUNE:5,
    JULY:6,
    AUG:7,
    SEP:8,
    OCT:9,
    NOV:10,
    DEC:11

};

export function buildSJITData(){

    /**
     * ==========================================
     * Latest Available Date
     * ==========================================
     */

    let latestDate=null;

    (DataStore.sales||[]).forEach(row=>{

        const month=

            MonthMap[
                String(
                    row.month||""
                ).toUpperCase()
            ];

        if(month===undefined){

            return;

        }

        const date=new Date(

            Number(row.year),

            month,

            Number(row.date)

        );

        if(

            !latestDate ||

            date>latestDate

        ){

            latestDate=date;

        }

    });

    /**
     * ==========================================
     * Analysis Window
     * ==========================================
     */

    const analysisTo=

        latestDate||

        new Date();

    const analysisFrom=

        new Date(

            analysisTo

        );

    analysisFrom.setDate(

        analysisTo.getDate()

        -

        IntelligenceConfig.analysisDays

    );

    /**
     * ==========================================
     * SJIT Sales
     * Last Analysis Window
     * ==========================================
     */

    const salesRows=

        (DataStore.sales||[])

        .filter(row=>{

            if(

                String(

                    row.po_type||""

                ).toUpperCase()

                !==

                "SJIT"

            ){

                return false;

            }

            const month=

                MonthMap[
                    String(
                        row.month||""
                    ).toUpperCase()
                ];

            if(month===undefined){

                return false;

            }

            const saleDate=

                new Date(

                    Number(row.year),

                    month,

                    Number(row.date)

                );

            return(

                saleDate>=analysisFrom &&

                saleDate<=analysisTo

            );

        });

    /**
     * ==========================================
     * SJIT Stock
     * ==========================================
     */

    const stockRows=

        DataStore.sjitStock||[];

    const warehouseMap={};

    /**
     * ==========================================
     * Build Stock
     * ==========================================
     */

    stockRows.forEach(row=>{

        const warehouseId=

            Number(

                row.warehouse_id||0

            );

        if(!warehouseId){

            return;

        }

        if(!warehouseMap[warehouseId]){

            const warehouse=

                WarehouseMap[warehouseId]||{};

            warehouseMap[warehouseId]={

                warehouseId,

                warehouseName:

                    warehouse.name||

                    row.warehouse_name||

                    "",

                shortName:

                    warehouse.shortName||

                    row.warehouse_name||

                    "",

                region:

                    warehouse.region||

                    "Unknown",

                stock:0,

                soldQty:0,

                gmv:0,

                styles:new Set(),

                states:new Set()

            };

        }

        warehouseMap[warehouseId].stock+=

            Number(

                row.inventory_count||0

            );

    });

    /**
     * ==========================================
     * Build Sales
     * ==========================================
     */

    salesRows.forEach(row=>{

        const warehouseId=

            Number(

                row.warehouse_id||0

            );

        if(!warehouseId){

            return;

        }

        if(!warehouseMap[warehouseId]){

            const warehouse=

                WarehouseMap[warehouseId]||{};

            warehouseMap[warehouseId]={

                warehouseId,

                warehouseName:

                    warehouse.name||

                    "",

                shortName:

                    warehouse.shortName||

                    "",

                region:

                    warehouse.region||

                    "Unknown",

                stock:0,

                soldQty:0,

                gmv:0,

                styles:new Set(),

                states:new Set()

            };

        }

        warehouseMap[warehouseId].soldQty+=

            Number(

                row.qty||0

            );

        warehouseMap[warehouseId].gmv+=

            Number(

                row.final_amount||0

            );

        warehouseMap[warehouseId].styles.add(

            String(

                row.style_id||""

            )

        );

        warehouseMap[warehouseId].states.add(

            String(

                row.state||""

            )

        );

    });

    /**
     * ==========================================
     * Normalize
     * ==========================================
     */

    const warehouseRows=

        Object.values(

            warehouseMap

        )

        .map(row=>({

            warehouseId:

                row.warehouseId,

            warehouseName:

                row.warehouseName,

            shortName:

                row.shortName,

            fc:

                row.shortName||

                row.warehouseName,

            region:

                row.region,

            stock:

                row.stock,

            soldQty:

                row.soldQty,

            gmv:

                row.gmv,

            styleCount:

                row.styles.size,

            stateCount:

                row.states.size

        }))

        .sort(

            (a,b)=>

                b.soldQty-

                a.soldQty

        );

    /**
     * ==========================================
     * Return
     * ==========================================
     */

    return{

        analysisFrom,

        analysisTo,

        salesRows,

        warehouseRows

    };

}