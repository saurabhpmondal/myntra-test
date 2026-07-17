/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Live Count
 * Version : V1.0
 * =====================================================
 */

import { renderTable } from "../../common/table/table.js";
import { getLiveCount } from "../../../services/liveCountService.js";

export async function renderLiveCount(target){

    const report = getLiveCount();

    const previous = report.previous || {};

    await renderTable({

        target,

        title:"Live Count",

        subtitle:report.date || "No Inventory Snapshot",

        columns:report.columns,

        rows:report.rows,

        cellClass:(row,column)=>{

            if(
                column.key==="date" ||
                column.key==="total"
            ){

                return "";

            }

            if(!previous[column.key]){

                return "";

            }

            if(row[column.key] > previous[column.key]){

                return "text-success";

            }

            if(row[column.key] < previous[column.key]){

                return "text-danger";

            }

            return "";

        }

    });

}