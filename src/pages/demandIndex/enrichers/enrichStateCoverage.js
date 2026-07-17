/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : State Coverage Enricher
 * Version : V1.0
 * =====================================================
 */

import { DataStore } from "../../../services/dataService.js";

export function enrichStateCoverage(

    rows

){

    const stateMap={};

    (DataStore.sales || []).forEach(

        sale=>{

            const styleId=

                String(

                    sale.style_id || ""

                ).trim();

            const state=

                String(

                    sale.state || ""

                ).trim();

            if(

                !styleId ||

                !state

            ){

                return;

            }

            if(

                !stateMap[styleId]

            ){

                stateMap[styleId]=

                    new Set();

            }

            stateMap[styleId].add(

                state

            );

        }

    );

    rows.forEach(

        row=>{

            row.stateCount=

                stateMap[

                    row.styleId

                ]

                ?

                stateMap[

                    row.styleId

                ].size

                :

                0;

        }

    );

    return rows;

}