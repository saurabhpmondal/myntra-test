/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Date Filter Service
 * Version : V2.0
 * =====================================================
 */

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

function buildDate(row){

    const day = Number(row.date);

    const month = MONTH_MAP[
        String(row.month || "")
            .trim()
            .toUpperCase()
    ];

    const year = Number(row.year);

    if(
        !day ||
        month === undefined ||
        !year
    ){

        return null;

    }

    return new Date(

        year,

        month,

        day

    );

}

export function getLatestDate(records){

    let latest = null;

    records.forEach(row=>{

        const date = buildDate(row);

        if(!date){

            return;

        }

        if(
            latest===null ||
            date>latest
        ){

            latest = date;

        }

    });

    return latest;

}

export function filterByDays(

    records,

    days

){

    if(
        !records ||
        records.length===0
    ){

        return [];

    }

    const latest = getLatestDate(records);

    if(!latest){

        return [];

    }

    const start = new Date(latest);

    start.setHours(0,0,0,0);

    latest.setHours(23,59,59,999);

    start.setDate(

        start.getDate()

        - Number(days)

        + 1

    );

    return records.filter(row=>{

        const date = buildDate(row);

        if(!date){

            return false;

        }

        return(

            date>=start &&
            date<=latest

        );

    });

}