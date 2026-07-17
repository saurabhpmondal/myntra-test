/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index Builder
 * Version : V4.0
 * =====================================================
 */

import { getSales }
from "../builders/getSales.js";

import { getPreviousDateRange }
from "../builders/getPreviousDateRange.js";

import { groupSalesByStyle }
from "../builders/groupSalesByStyle.js";

import { buildRows }
from "../builders/buildRows.js";

import { buildRankedRows }
from "../builders/buildRankedRows.js";

import { finalizeRows }
from "../builders/finalizeRows.js";

/**
 * =====================================================
 * Build Demand Index
 * =====================================================
 */

export function buildDemandIndex(

    fromDate,

    toDate

){

    /**
     * ==========================================
     * Current Sales
     * ==========================================
     */

    const currentSales=

        getSales(

            fromDate,

            toDate

        );

    /**
     * ==========================================
     * Previous Date Range
     * ==========================================
     */

    const previousRange=

        getPreviousDateRange(

            fromDate,

            toDate

        );

    /**
     * ==========================================
     * Previous Sales
     * ==========================================
     */

    const previousSales=

        getSales(

            previousRange.fromDate,

            previousRange.toDate

        );

    /**
     * ==========================================
     * Build Current Rows
     * ==========================================
     */

    let rows=

        buildRows(

            groupSalesByStyle(

                currentSales

            ),

            currentSales

        );

    /**
     * ==========================================
     * Build Previous Rows
     * ==========================================
     */

    let previousRows=

        buildRows(

            groupSalesByStyle(

                previousSales

            ),

            previousSales

        );

    /**
     * ==========================================
     * Apply Ranking
     * ==========================================
     */

    rows=

        buildRankedRows(

            rows

        );

    previousRows=

        buildRankedRows(

            previousRows

        );

    /**
     * ==========================================
     * Final Processing
     * ==========================================
     */

    rows=

        finalizeRows(

            rows,

            previousRows

        );

    /**
     * ==========================================
     * Return
     * ==========================================
     */

    return rows;

}