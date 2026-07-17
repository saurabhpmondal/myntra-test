/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : India Map Data Builder
 * Version : V2.0
 * =====================================================
 */

import {

    normalizeState

}

from "../../../config/stateMap.js";

export function buildMapData(

    salesRows

){

    const stateMap={};

    salesRows.forEach(

        row=>{

            const state=

                normalizeState(

                    row.state

                );

            if(

                !state

            ){

                return;

            }

            if(

                !stateMap[state]

            ){

                stateMap[state]={

                    name:state,

                    value:0,

                    styles:new Set()

                };

            }

            stateMap[state].value+=

                Number(

                    row.qty||0

                );

            stateMap[state].styles.add(

                String(

                    row.style_id||""

                )

            );

        }

    );

    return Object.values(

        stateMap

    )

    .map(

        row=>({

            name:row.name,

            value:row.value,

            styleCount:

                row.styles.size

        })

    )

    .sort(

        (a,b)=>

            b.value-

            a.value

    );

}