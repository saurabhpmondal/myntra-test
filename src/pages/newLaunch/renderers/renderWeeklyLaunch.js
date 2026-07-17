/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Weekly Launch Renderer
 * Version : V3.0
 * =====================================================
 */

import {

    renderTable

}

from "../../../components/common/table/table.js";

export async function renderWeeklyLaunch(

    target,

    rows=[]

){

    await renderTable({

        target,

        title:

            "Weekly Launch Performance",

        subtitle:

            "Compare weekly launches to identify successful launch weeks and improve future launch planning.",

        columns:[

            {

                key:"launchWeek",

                label:"Week",

                renderer:value=>

                    `Week ${value}`

            },

            {

                key:"ageRange",

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