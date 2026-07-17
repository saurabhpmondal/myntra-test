/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Month Wise GMV
 * Version : V1.0
 * =====================================================
 */

import { renderTable } from "../../common/table/table.js";
import { getMonthWiseGMV } from "../../../services/monthWiseGMVService.js";

export async function renderMonthWiseGMV(target){

    const report = getMonthWiseGMV();

    await renderTable({

        target,

        title: "Month Wise Brand Sale (GMV)",

        subtitle: "Last 6 Months Performance",

        columns: report.columns,

        rows: report.rows

    });

}