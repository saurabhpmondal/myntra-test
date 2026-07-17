/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index Table
 * Version : V3.0
 * =====================================================
 */

import { renderTable as renderCommonTable }
from "../../../components/common/table/table.js";

import {
    getDemandIndexTableConfig
}
from "../config/tableConfig.js";

/**
 * =====================================================
 * Render Demand Index Table
 * =====================================================
 */

export async function renderTable(

    target,

    rows=[]

){

    const config=

        getDemandIndexTableConfig(

            target,

            rows

        );

    await renderCommonTable(

        config

    );

}