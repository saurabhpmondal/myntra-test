/**
 * =====================================================
 * Project Phoenix
 * Sales & Return V12
 * KPI Builder
 * =====================================================
 */

import {
    getLatestPeriod,
    getPeriodKey
} from "../../services/periodService.js";

import {
    growth
} from "./salesReturnUtils.js";

/**
 * Build KPI payloads for Phoenix KPI Card component.
 *
 * @param {SalesReturnService} service
 * @returns {Array}
 */
export function buildSalesReturnKPIs(service) {

    const sales = service.getSalesRows();
    const returns = service.getReturnRows();

    const latest = getLatestPeriod(sales);

    if (!latest) return [];

    const latestKey = latest.key;

    const previousKey = (() => {
        const year = Math.floor(latestKey / 100);
        const month = latestKey % 100;

        if (month === 1) {
            return (year - 1) * 100 + 12;
        }

        return year * 100 + (month - 1);
    })();

    const currentSales = sales.filter(
        r => getPeriodKey(r.month, r.year) === latestKey
    );

    const previousSales = sales.filter(
        r => getPeriodKey(r.month, r.year) === previousKey
    );

    const currentReturns = returns.filter(
        r => getPeriodKey(r.month, r.year) === latestKey
    );

    const previousReturns = returns.filter(
        r => getPeriodKey(r.month, r.year) === previousKey
    );

    // Current period
    service.setFilteredData(currentSales, currentReturns);

    const saleNow = service.getSalesSummary();
    const cancelNow = service.getCancelSummary();
    const rtoNow = service.getRTOSummary();
    const cxNow = service.getCXSummary();
    const netNow = service.getNetSummary();

    // Previous period
    service.setFilteredData(previousSales, previousReturns);

    const salePrev = service.getSalesSummary();
    const cancelPrev = service.getCancelSummary();
    const rtoPrev = service.getRTOSummary();
    const cxPrev = service.getCXSummary();
    const netPrev = service.getNetSummary();

    // Restore latest period
    service.setFilteredData(currentSales, currentReturns);

    return [

        buildCard("Sales", saleNow, salePrev),

        buildCard("Cancel", cancelNow, cancelPrev),

        buildCard("RTO", rtoNow, rtoPrev),

        buildCard("CX Return", cxNow, cxPrev),

        buildCard("Net", netNow, netPrev)

    ];

}

function buildCard(title, current, previous) {

    const gmvGrowth = growth(
        current.gmv,
        previous.gmv
    );

    const unitGrowth = growth(
        current.units,
        previous.units
    );

    return {

        title,

        data: {

            gmv: {

                current: current.gmv,

                growth: {

                    value: gmvGrowth,

                    direction: getDirection(gmvGrowth)

                }

            },

            units: {

                current: current.units,

                growth: {

                    value: unitGrowth,

                    direction: getDirection(unitGrowth)

                }

            }

        }

    };

}

function getDirection(value) {

    if (value > 0) return "up";

    if (value < 0) return "down";

    return "flat";

}