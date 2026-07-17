/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Top Style Service
 * Version : V1.0
 * =====================================================
 */

import { getFilteredSales } from "./filterService.js";
import { LookupStore } from "./lookupService.js";

export function getTopStyles(limit = 20){

    const rows = getFilteredSales();

    const styles = {};

    rows.forEach(row=>{

        const id = row.style_id;

        if(!styles[id]){

            const product = LookupStore.productMap[id] || {};

            styles[id]={

                styleId:id,

                brand:product.brand || "-",

                units:0,

                gmv:0

            };

        }

        styles[id].units += Number(row.qty || 0);

        styles[id].gmv += Number(row.final_amount || 0);

    });

    return Object.values(styles)

        .map(item=>({

            ...item,

            asp:

                item.units===0

                    ?0

                    :item.gmv/item.units

        }))

        .sort((a,b)=>{

            if(b.units!==a.units){

                return b.units-a.units;

            }

            return b.gmv-a.gmv;

        })

        .slice(0,limit)

        .map((item,index)=>({

            rank:index+1,

            ...item

        }));

}