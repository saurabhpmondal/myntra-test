/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Period Service
 * =====================================================
 */

const MONTH_MAP = {

    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12

};

const MONTH_NAME = {

    1: "JAN",
    2: "FEB",
    3: "MAR",
    4: "APR",
    5: "MAY",
    6: "JUNE",
    7: "JULY",
    8: "AUG",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC"

};

/**
 * Returns sortable period key
 * Example:
 * MAY 2026 -> 202605
 */

export function getPeriodKey(month, year){

    if(!month || !year) return 0;

    const monthNo = MONTH_MAP[String(month).toUpperCase()] || Number(month);

    return Number(year) * 100 + monthNo;

}

/**
 * Human readable label
 */

export function getPeriodLabel(month, year){

    const monthNo = MONTH_MAP[String(month).toUpperCase()] || Number(month);

    return `${MONTH_NAME[monthNo]} ${year}`;

}

/**
 * Find latest available period
 */

export function getLatestPeriod(records){

    if(!records.length){

        return null;

    }

    let latest = null;

    let latestKey = 0;

    records.forEach(record=>{

        const key = getPeriodKey(record.month,record.year);

        if(key > latestKey){

            latestKey = key;

            latest = {

                key,

                month: record.month,

                year: record.year,

                label: getPeriodLabel(record.month,record.year)

            };

        }

    });

    return latest;

}