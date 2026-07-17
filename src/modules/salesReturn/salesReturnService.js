/**
 * ==========================================================
 * Project Phoenix
 * Sales & Return V12
 * Service Layer
 * ==========================================================
 */

import {
    createOrderLookup,
    sumSales,
    sumCancel,
    sumReturns,
    calculateNet
} from "./salesReturnUtils.js";

class SalesReturnService {

    constructor() {
        this.sales = [];
        this.returns = [];
        this.orderLookup = new Map();
    }

    /**
     * Load datasets from existing Phoenix DataStore
     */
    load(dataStore) {

        if (!dataStore) {
            throw new Error("SalesReturnService : DataStore not available.");
        }

        this.sales = dataStore.sale_data || [];
        this.returns = dataStore.return_data || [];

        this.orderLookup = createOrderLookup(this.sales);

        return this;
    }

    /**
     * Replace datasets after Global Filter
     */
    setFilteredData(salesRows = [], returnRows = []) {

        this.sales = salesRows;
        this.returns = returnRows;

        this.orderLookup = createOrderLookup(this.sales);

        return this;
    }

    getSalesRows() {
        return this.sales;
    }

    getReturnRows() {
        return this.returns;
    }

    getOrderLookup() {
        return this.orderLookup;
    }

    /**
     * ==================================================
     * KPI
     * ==================================================
     */

    getSalesSummary() {
        return sumSales(this.sales);
    }

    getCancelSummary() {
        return sumCancel(this.sales);
    }

    getRTOSummary() {
        return sumReturns(
            this.returns,
            this.orderLookup,
            "RTO"
        );
    }

    getCXSummary() {
        return sumReturns(
            this.returns,
            this.orderLookup,
            "Return"
        );
    }

    getNetSummary() {

        return calculateNet(
            this.getSalesSummary(),
            this.getCancelSummary(),
            this.getRTOSummary(),
            this.getCXSummary()
        );

    }

    /**
     * ==================================================
     * Generic Aggregation
     * ==================================================
     */

    aggregateSales(field) {

        const map = new Map();

        for (const row of this.sales) {

            const key = row[field] || "Unknown";

            if (!map.has(key)) {

                map.set(key, {
                    name: key,
                    units: 0,
                    gmv: 0
                });

            }

            const item = map.get(key);

            item.units += Number(row.qty || 0);
            item.gmv += Number(row.final_amount || 0);

        }

        return [...map.values()];
    }

    aggregateCancel(field) {

        const map = new Map();

        for (const row of this.sales) {

            if (row.order_status !== "F") continue;

            const key = row[field] || "Unknown";

            if (!map.has(key)) {

                map.set(key, {
                    name: key,
                    units: 0,
                    gmv: 0
                });

            }

            const item = map.get(key);

            item.units += Number(row.qty || 0);
            item.gmv += Number(row.final_amount || 0);

        }

        return [...map.values()];
    }

    aggregateReturns(field, type = "Return") {

        const map = new Map();

        for (const row of this.returns) {

            if (row.type !== type) continue;

            const sale = this.orderLookup.get(row.order_line_id);

            if (!sale) continue;

            const key = sale[field] || "Unknown";

            if (!map.has(key)) {

                map.set(key, {
                    name: key,
                    units: 0,
                    gmv: 0
                });

            }

            const item = map.get(key);

            item.units += 1;
            item.gmv += Number(sale.final_amount || 0);

        }

        return [...map.values()];
    }

    /**
     * ==================================================
     * Monthly Trend
     * ==================================================
     */

    getMonthlyTrend() {

        const trend = new Map();

        for (const sale of this.sales) {

            const month = sale.month;

            if (!trend.has(month)) {

                trend.set(month, {

                    month,

                    salesUnits: 0,
                    salesGMV: 0,

                    cancelUnits: 0,
                    cancelGMV: 0,

                    rtoUnits: 0,
                    rtoGMV: 0,

                    cxUnits: 0,
                    cxGMV: 0

                });

            }

            const item = trend.get(month);

            item.salesUnits += Number(sale.qty || 0);
            item.salesGMV += Number(sale.final_amount || 0);

            if (sale.order_status === "F") {

                item.cancelUnits += Number(sale.qty || 0);
                item.cancelGMV += Number(sale.final_amount || 0);

            }

        }

        for (const ret of this.returns) {

            const month = ret.month;

            const sale = this.orderLookup.get(ret.order_line_id);

            if (!sale) continue;

            if (!trend.has(month)) {

                trend.set(month, {

                    month,

                    salesUnits: 0,
                    salesGMV: 0,

                    cancelUnits: 0,
                    cancelGMV: 0,

                    rtoUnits: 0,
                    rtoGMV: 0,

                    cxUnits: 0,
                    cxGMV: 0

                });

            }

            const item = trend.get(month);

            if (ret.type === "RTO") {

                item.rtoUnits += 1;
                item.rtoGMV += Number(sale.final_amount || 0);

            }

            if (ret.type === "Return") {

                item.cxUnits += 1;
                item.cxGMV += Number(sale.final_amount || 0);

            }

        }

        const rows = [];

        for (const item of trend.values()) {

            item.netUnits =
                item.salesUnits -
                item.cancelUnits -
                item.rtoUnits -
                item.cxUnits;

            item.netGMV =
                item.salesGMV -
                item.cancelGMV -
                item.rtoGMV -
                item.cxGMV;

            rows.push(item);

        }

        rows.sort((a, b) => {

            if (a.month === b.month) return 0;

            return a.month > b.month ? 1 : -1;

        });

        return rows;

    }

}

export default new SalesReturnService();