/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Projection Service
 * Version : V1.0
 * =====================================================
 */

import { getLatestPeriod } from "./periodService.js";
import { DataStore } from "./dataService.js";

export function projectMetric(rows, field) {

    if (!rows.length) {

        return {

            actual: 0,

            projected: 0,

            projectedMode: false,

            drr: 0,

            elapsedDays: 0,

            totalDays: 0

        };

    }

    const latest = getLatestPeriod(DataStore.sales);

    const row = rows[0];

    const isLatest =

        row.month === latest.month &&

        Number(row.year) === Number(latest.year);

    let total = 0;

    let maxDay = 0;

    rows.forEach(r => {

        total += Number(r[field] || 0);

        maxDay = Math.max(
            maxDay,
            Number(r.date || 0)
        );

    });

    if (!isLatest) {

        return {

            actual: total,

            projected: total,

            projectedMode: false,

            drr: 0,

            elapsedDays: maxDay,

            totalDays: daysInMonth(
                row.month,
                row.year
            )

        };

    }

    const totalDays = daysInMonth(
        row.month,
        row.year
    );

    const elapsed = Math.max(maxDay, 1);

    const drr = total / elapsed;

    return {

        actual: total,

        projected: Math.round(drr * totalDays),

        projectedMode: true,

        drr,

        elapsedDays: elapsed,

        totalDays

    };

}

function daysInMonth(month, year) {

    const months = {

        JAN:1,
        FEB:2,
        MAR:3,
        APR:4,
        MAY:5,
        JUNE:6,
        JULY:7,
        AUG:8,
        SEP:9,
        OCT:10,
        NOV:11,
        DEC:12

    };

    const m = months[
        String(month).toUpperCase()
    ];

    return new Date(
        Number(year),
        m,
        0
    ).getDate();

}