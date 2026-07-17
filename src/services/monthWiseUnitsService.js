/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Month Wise Units Service
 * Version : V1.0
 * =====================================================
 */

import { getTrendSales } from "./filterService.js";
import { projectMetric } from "./projectionService.js";
import { getPeriodKey } from "./periodService.js";

export function getMonthWiseUnits() {

    const sales = getTrendSales();

    const monthMap = {};
    const brandSet = new Set();

    sales.forEach(row => {

        const brand = row.brand || "Unknown";

        brandSet.add(brand);

        const key = getPeriodKey(row.month, row.year);

        if (!monthMap[key]) {

            monthMap[key] = {

                month: row.month,

                year: row.year,

                rows: []

            };

        }

        monthMap[key].rows.push(row);

    });

    const periods = Object.values(monthMap)
        .sort((a, b) =>
            getPeriodKey(a.month, a.year) -
            getPeriodKey(b.month, b.year)
        );

    const lastSix = periods.slice(-6);

    const latest = lastSix[lastSix.length - 1];

    const previous = lastSix[lastSix.length - 2];

    const brands = [...brandSet].sort((a, b) => {

        const pa = projectMetric(
            latest.rows.filter(r => (r.brand || "Unknown") === a),
            "qty"
        ).projected;

        const pb = projectMetric(
            latest.rows.filter(r => (r.brand || "Unknown") === b),
            "qty"
        ).projected;

        return pb - pa;

    });

    const columns = [

        {
            key: "month",
            label: "Month",
            align: "left"
        }

    ];

    brands.forEach(brand => {

        columns.push({

            key: brand,

            label: brand,

            align: "center",
            format: "number"

        });

    });

    const rows = [];

    // Last 5 completed months

    lastSix.slice(0, -1).forEach(period => {

        const row = {

            month: monthLabel(period)

        };

        brands.forEach(brand => {

            row[brand] = sum(

                period.rows.filter(r => (r.brand || "Unknown") === brand),

                "qty"

            );

        });

        rows.push(row);

    });

    // MTD

    const mtd = {

        month: `${short(latest.month)}-${String(latest.year).slice(2)} MTD`

    };

    brands.forEach(brand => {

        mtd[brand] = projectMetric(

            latest.rows.filter(r => (r.brand || "Unknown") === brand),

            "qty"

        ).actual;

    });

    rows.push(mtd);

    // DRR

    const drr = {

        month: "DRR"

    };

    brands.forEach(brand => {

        drr[brand] = Math.round(

            projectMetric(

                latest.rows.filter(r => (r.brand || "Unknown") === brand),

                "qty"

            ).drr

        );

    });

    rows.push(drr);

    // Projection

    const projection = {

        month: `${short(latest.month)}-${String(latest.year).slice(2)} (Proj)`

    };

    brands.forEach(brand => {

        projection[brand] = projectMetric(

            latest.rows.filter(r => (r.brand || "Unknown") === brand),

            "qty"

        ).projected;

    });

    rows.push(projection);

    // Growth %

    const growth = {

        month: "Growth (%)"

    };

    brands.forEach(brand => {

        const prev = previous
            ? sum(previous.rows.filter(r => (r.brand || "Unknown") === brand), "qty")
            : 0;

        const proj = projection[brand];

        growth[brand] = prev === 0
            ? 0
            : Number((((proj - prev) / prev) * 100).toFixed(2));

    });

    rows.push(growth);

    // Contribution %

    const contribution = {

        month: "Contribution (%)"

    };

    const totalProjection = brands.reduce(
        (t, b) => t + Number(projection[b] || 0),
        0
    );

    brands.forEach(brand => {

        contribution[brand] = totalProjection === 0
            ? 0
            : Number(((projection[brand] / totalProjection) * 100).toFixed(2));

    });

    rows.push(contribution);

    return {

        columns,

        rows

    };

}

function sum(rows, field) {

    return rows.reduce(
        (t, r) => t + Number(r[field] || 0),
        0
    );

}

function monthLabel(period) {

    return `${short(period.month)}-${String(period.year).slice(2)}`;

}

function short(month) {

    const map = {

        JAN: "Jan",
        FEB: "Feb",
        MAR: "Mar",
        APR: "Apr",
        MAY: "May",
        JUNE: "Jun",
        JULY: "Jul",
        AUG: "Aug",
        SEP: "Sep",
        OCT: "Oct",
        NOV: "Nov",
        DEC: "Dec"

    };

    return map[String(month).toUpperCase()] || month;

}