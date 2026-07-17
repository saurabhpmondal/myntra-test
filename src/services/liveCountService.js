/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Live Count Service
 * Version : V2.0
 * =====================================================
 */

import { DataStore } from "./dataService.js";

export function getLiveCount() {

    const listings = DataStore.listings.filter(row =>

        String(row.article_type || "").toUpperCase() === "SAREES" &&

        String(row.style_status_description || "").toUpperCase() === "ACTIVE" &&

        String(row.listing_status_description || "").toUpperCase() === "ACTIVE"

    );

    const inventory = DataStore.inventory;

    const brands = [

        ...new Set(

            listings.map(r => r.brand)

        )

    ].sort();

    const columns = [

        {
            key: "date",
            label: "Date",
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

    columns.push({

        key: "total",

        label: "Total Live",

        align: "center",

        format: "number"

    });

    // =====================================
    // Snapshot Dates (Current Month Only)
    // =====================================

    const latestDate = inventory.reduce((latest, row) => {

        if (!latest) return row.snapshot_date;

        return parseDate(row.snapshot_date) > parseDate(latest)

            ? row.snapshot_date

            : latest;

    }, null);

    if (!latestDate) {

        return {

            columns,

            rows: []

        };

    }

    const latest = parseDate(latestDate);

    const currentMonth = latest.getMonth();

    const currentYear = latest.getFullYear();

    const snapshotDates = [

        ...new Set(

            inventory

                .filter(r => {

                    const d = parseDate(r.snapshot_date);

                    return (

                        d.getMonth() === currentMonth &&

                        d.getFullYear() === currentYear

                    );

                })

                .map(r => r.snapshot_date)

        )

    ].sort((a, b) => parseDate(a) - parseDate(b));

    const rows = [];

    snapshotDates.forEach(date => {

        const stockMap = {};

        inventory

            .filter(r => r.snapshot_date === date)

            .forEach(r => {

                stockMap[r.style_id] =

                    (stockMap[r.style_id] || 0) +

                    Number(r.inventory_count || 0);

            });

        const row = {

            date,

            total: 0

        };

        brands.forEach(brand => {

            let count = 0;

            const counted = new Set();

            listings

                .filter(r => r.brand === brand)

                .forEach(style => {

                    const id = String(style.style_id);

                    if (

                        Number(stockMap[id] || 0) > 0 &&

                        !counted.has(id)

                    ) {

                        counted.add(id);

                        count++;

                    }

                });

            row[brand] = count;

            row.total += count;

        });

        rows.push(row);

    });

    return {

        columns,

        rows

    };

}

function parseDate(value) {

    const [d, m, y] = value.split("-").map(Number);

    return new Date(y, m - 1, d);

}

