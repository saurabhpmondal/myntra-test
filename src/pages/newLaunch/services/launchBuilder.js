/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Launch Builder
 * Version : V2.0
 * =====================================================
 */

import {

    DataStore

}

from "../../../services/dataService.js";

/**
 * =====================================================
 * Build Launch Dataset
 * =====================================================
 */

export function buildLaunchDataset(

    launchWindow=30

){

    const master=

        DataStore.productMaster||[];

    const sales=

        DataStore.sales||[];

    const today=

        new Date();

    /**
     * ==========================================
     * Sales Summary
     * ==========================================
     */

    const salesMap={};

    sales.forEach(

        row=>{

            const styleId=

                String(

                    row.style_id||""

                ).trim();

            if(!styleId){

                return;

            }

            if(

                !salesMap[styleId]

            ){

                salesMap[styleId]={

                    units:0,

                    revenue:0,

                    orders:new Set()

                };

            }

            salesMap[styleId].units+=

                Number(

                    row.qty||0

                );

            salesMap[styleId].revenue+=

                Number(

                    row.final_amount||0

                );

            salesMap[styleId].orders.add(

                row.order_line_id

            );

        }

    );

    /**
     * ==========================================
     * Launch Dataset
     * ==========================================
     */

    const rows=[];

    master.forEach(

        row=>{

            const launchDate=

                buildDate(

                    row

                );

            if(

                !launchDate

            ){

                return;

            }

            const launchAge=

                getDaysBetween(

                    launchDate,

                    today

                );

            if(

                launchAge>

                launchWindow

            ){

                return;

            }

            const styleId=

                String(

                    row.style_id||""

                ).trim();

            const sale=

                salesMap[styleId]||

                {

                    units:0,

                    revenue:0,

                    orders:new Set()

                };

            const units=

                sale.units;

            const revenue=

                sale.revenue;

            const orders=

                sale.orders.size;

            const asp=

                units

                ?

                revenue/units

                :

                0;

            let status=

                "🔴 Dead";

            if(

                units>=50

            ){

                status=

                    "🚀 Hot";

            }

            else if(

                units>=20

            ){

                status=

                    "🟢 Good";

            }

            else if(

                units>0

            ){

                status=

                    "🟡 Slow";

            }

            rows.push({

                styleId,

                brand:

                    row.brand||"",

                articleType:

                    row.article_type||"",

                launchDate,

                launchAge,

                units,

                revenue,

                orders,

                asp,

                status

            });

        }

    );

    return rows.sort(

        (a,b)=>

            b.revenue-

            a.revenue

    );

}

/**
 * =====================================================
 * Build Date
 * =====================================================
 */

function buildDate(

    row

){

    const year=

        Number(

            row.year

        );

    const month=

        Number(

            row.month

        );

    const day=

        Number(

            row.date

        );

    if(

        !year ||

        !month ||

        !day

    ){

        return null;

    }

    return new Date(

        year,

        month-1,

        day

    );

}

/**
 * =====================================================
 * Days Between
 * =====================================================
 */

function getDaysBetween(

    start,

    end

){

    return Math.floor(

        (

            end-start

        )

        /

        86400000

    );

}