/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Launch Age Analysis Renderer
 * Version : V2.1
 * =====================================================
 */

import {

    renderTable

}

from "../../../components/common/table/table.js";

export async function renderLaunchAgeAnalysis(

    target,

    rows=[]

){

    await renderTable({

        target,

        title:

            "Launch Age Analysis",

        subtitle:

            "Analyze contribution of styles across launch age buckets to understand lifecycle performance.",

        columns:[

            {

                key:"bucket",

                label:"Launch Age"

            },

            {

                key:"launches",

                label:"Launches",

                format:"number"

            },

            {

                key:"soldStyles",

                label:"Sold Styles",

                format:"number"

            },

            {

                key:"deadLaunches",

                label:"Dead Launches",

                format:"number"

            },

            {

                key:"unitsSold",

                label:"Units Sold",

                format:"number"

            },

            {

                key:"revenue",

                label:"Revenue",

                format:"currency"

            },

            {

                key:"successRate",

                label:"Success %",

                renderer:value=>

                    `${Number(

                        value||0

                    ).toFixed(1)}%`

            }

        ],

        rows

    });

}