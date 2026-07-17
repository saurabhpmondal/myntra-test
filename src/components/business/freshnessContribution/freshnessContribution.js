/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Freshness Contribution
 * Version : V1.1
 * =====================================================
 */

import { renderTable } from "../../common/table/table.js";
import { getFreshnessContribution } from "../../../services/freshnessContributionService.js";

export async function renderFreshnessContribution(target){

    const report = getFreshnessContribution();

    await renderTable({

        target,

        title:"Freshness Contribution",

        subtitle:"Sales for Last 30 Days",

        columns:report.columns,

        rows:report.rows,

        rowClass:row=>{

            if(row.band==="Grand Total"){

                return "table-total";

            }

            return "";

        },

        cellClass:(row,column)=>{

            if(row.band==="Grand Total"){

                return "fw-bold";

            }

            if(column.key==="share"){

                if(row.share>=30){

                    return "text-success";

                }

                if(row.share<10){

                    return "text-danger";

                }

            }

            return "";

        }

    });

}