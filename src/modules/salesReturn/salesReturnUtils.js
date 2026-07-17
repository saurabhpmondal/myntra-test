/**
 * ==========================================================
 * Project Phoenix
 * Sales & Return V12
 * Utility Functions
 * ==========================================================
 */

export function toNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
}

export function safeQty(value) {
    return toNumber(value);
}

export function safeAmount(value) {
    return toNumber(value);
}

export function round2(value) {
    return Math.round((toNumber(value) + Number.EPSILON) * 100) / 100;
}

export function createOrderLookup(salesData = []) {
    const lookup = new Map();

    for (const row of salesData) {
        lookup.set(row.order_line_id, row);
    }

    return lookup;
}

export function sumSales(salesRows = []) {
    let units = 0;
    let gmv = 0;

    for (const row of salesRows) {
        units += safeQty(row.qty);
        gmv += safeAmount(row.final_amount);
    }

    return {
        units,
        gmv: round2(gmv)
    };
}

export function sumCancel(salesRows = []) {
    let units = 0;
    let gmv = 0;

    for (const row of salesRows) {
        if (row.order_status !== "F") continue;

        units += safeQty(row.qty);
        gmv += safeAmount(row.final_amount);
    }

    return {
        units,
        gmv: round2(gmv)
    };
}

export function sumReturns(returnRows = [], orderLookup = new Map(), type = "Return") {
    let units = 0;
    let gmv = 0;

    for (const row of returnRows) {

        if (row.type !== type) continue;

        units++;

        const sale = orderLookup.get(row.order_line_id);

        if (sale) {
            gmv += safeAmount(sale.final_amount);
        }
    }

    return {
        units,
        gmv: round2(gmv)
    };
}

export function calculateNet(sale, cancel, rto, cx) {

    return {

        units:
            safeQty(sale.units) -
            safeQty(cancel.units) -
            safeQty(rto.units) -
            safeQty(cx.units),

        gmv: round2(
            safeAmount(sale.gmv) -
            safeAmount(cancel.gmv) -
            safeAmount(rto.gmv) -
            safeAmount(cx.gmv)
        )

    };
}

export function growth(current, previous) {

    current = toNumber(current);
    previous = toNumber(previous);

    if (previous === 0) {
        return current === 0 ? 0 : 100;
    }

    return round2(((current - previous) / previous) * 100);
}

export function groupBy(rows, field) {

    const map = new Map();

    for (const row of rows) {

        const key = row[field] ?? "Unknown";

        if (!map.has(key)) {
            map.set(key, []);
        }

        map.get(key).push(row);

    }

    return map;
}

export function sortDesc(rows, field) {

    return [...rows].sort((a, b) => {
        return toNumber(b[field]) - toNumber(a[field]);
    });

}

export function formatCurrency(value) {

    return new Intl.NumberFormat("en-IN", {

        maximumFractionDigits: 2,
        minimumFractionDigits: 2

    }).format(toNumber(value));

}

export function formatNumber(value) {

    return new Intl.NumberFormat("en-IN").format(toNumber(value));

}

export function uniqueValues(rows = [], field) {

    return [...new Set(rows.map(r => r[field]))].filter(Boolean);

}

export function clone(obj) {

    return JSON.parse(JSON.stringify(obj));

}