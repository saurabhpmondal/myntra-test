/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Month Wise Units
 * Version : V1.0
 * =====================================================
 */

import { renderTable } from "../../common/table/table.js";
import { getMonthWiseUnits } from "../../../services/monthWiseUnitsService.js";

export async function renderMonthWiseUnits(target){

    const report = getMonthWiseUnits();

    await renderTable({

        target,

        title: "Month Wise Brand Sale (Units)",

        subtitle: "Last 6 Months Performance",

        columns: report.columns,

        rows: report.rows,

        rowClass: row => {

            if(row.month === "DRR"){

                return "table-warning";

            }

            if(row.month.includes("(Proj)")){

                return "table-info";

            }

            if(row.month === "Growth (%)"){

                return "table-success";

            }

            if(row.month === "Contribution (%)"){

                return "table-secondary";

            }

            return "";

        },

        cellClass:(row,column)=>{

            if(column.key==="month"){

                return "";

            }

            if(row.month==="Growth (%)"){

                const value=Number(row[column.key]);

                if(value>0){

                    return "text-success";

                }

                if(value<0){

                    return "text-danger";

                }

            }

            return "";

        }

    });

}