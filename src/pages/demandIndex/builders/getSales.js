/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Get Sales
 * Version : V1.0
 * =====================================================
 */

import { DataStore }
from "../../../services/dataService.js";

const MONTH_MAP={

    JAN:0,

    FEB:1,

    MAR:2,

    APR:3,

    MAY:4,

    JUN:5,

    JUNE:5,

    JUL:6,

    JULY:6,

    AUG:7,

    SEP:8,

    OCT:9,

    NOV:10,

    DEC:11

};

export function getSales(

    fromDate,

    toDate

){

    return(

        DataStore.sales || []

    ).filter(

        row=>{

            const day=

                Number(

                    row.date || 0

                );

            const year=

                Number(

                    row.year || 0

                );

            const month=

                MONTH_MAP[

                    String(

                        row.month || ""

                    )

                    .trim()

                    .toUpperCase()

                ];

            if(

                !day ||

                !year ||

                month===undefined

            ){

                return false;

            }

            const orderDate=

                new Date(

                    year,

                    month,

                    day

                );

            return(

                orderDate>=fromDate

                &&

                orderDate<=toDate

            );

        }

    );

}