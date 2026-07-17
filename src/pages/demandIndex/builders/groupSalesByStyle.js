/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Group Sales By Style
 * Version : V1.0
 * =====================================================
 */

export function groupSalesByStyle(

    sales

){

    const grouped={};

    sales.forEach(

        row=>{

            const styleId=

                String(

                    row.style_id || ""

                ).trim();

            if(

                !styleId

            ){

                return;

            }

            if(

                !grouped[

                    styleId

                ]

            ){

                grouped[

                    styleId

                ]=[];

            }

            grouped[

                styleId

            ].push(

                row

            );

        }

    );

    return grouped;

}