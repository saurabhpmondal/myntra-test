/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Month Wise ASP
 * Version : V1.0
 * =====================================================
 */

import { renderTable } from "../../common/table/table.js";
import { getMonthWiseASP } from "../../../services/monthWiseASPService.js";

export async function renderMonthWiseASP(target){

    const report = getMonthWiseASP();

    await renderTable({

        target,

        title: "Month Wise Brand Sale (ASP)",

        subtitle: "Last 6 Months Performance",

        columns: report.columns,

        rows: report.rows

    });

}