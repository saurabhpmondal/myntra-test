/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Shipment Date Filter
 * Version : V5.1
 * =====================================================
 */

import { DataStore } from "../dataService.js";

const MONTH_MAP = {

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

function toDate(row){

    return new Date(

        Number(row.year),

        MONTH_MAP[String(row.month).toUpperCase()],

        Number(row.date)

    );

}

export function getShipmentPeriod(saleDays){

    const sales = DataStore.sales || [];

    const returns = DataStore.returns || [];

    if(!sales.length){

        return{

            sales:[],

            returns:[]

        };

    }

    // ---------------------------------------
    // Find latest sale date
    // ---------------------------------------

    let latest = toDate(sales[0]);

    sales.forEach(row=>{

        const current = toDate(row);

        if(current>latest){

            latest=current;

        }

    });

    // ---------------------------------------
    // From Date
    // ---------------------------------------

    const fromDate = new Date(latest);

    fromDate.setHours(0,0,0,0);

    latest.setHours(23,59,59,999);

    fromDate.setDate(

        fromDate.getDate()

        - Number(saleDays)

        + 1

    );

    // ---------------------------------------
    // Sales
    // ---------------------------------------

    const filteredSales = sales.filter(row=>{

        const current = toDate(row);

        return(

            current>=fromDate &&

            current<=latest

        );

    });

    // ---------------------------------------
    // Returns
    // ---------------------------------------

    const filteredReturns = returns.filter(row=>{

        const current = toDate(row);

        return(

            current>=fromDate &&

            current<=latest

        );

    });

    console.table({

        Latest:latest.toLocaleDateString(),

        From:fromDate.toLocaleDateString(),

        Sales:filteredSales.length,

        Returns:filteredReturns.length

    });

    return{

        sales:filteredSales,

        returns:filteredReturns

    };

}