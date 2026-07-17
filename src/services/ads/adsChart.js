/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Ads Chart Engine
 * Version : V1.0
 * =====================================================
 */

export function buildAdsChart(

    dailyRows

){

    const rows=[

        ...dailyRows

    ];

    rows.sort(

        (a,b)=>

            parseDate(

                a.date

            )-

            parseDate(

                b.date

            )

    );

    return{

        labels:

            rows.map(row=>

                row.date

            ),

        series:[

            {

                name:

                    "Spend",

                data:

                    rows.map(row=>

                        row.spend

                    )

            },

            {

                name:

                    "Revenue",

                data:

                    rows.map(row=>

                        row.revenue

                    )

            },

            {

                name:

                    "Units Sold",

                data:

                    rows.map(row=>

                        row.units

                    )

            }

        ]

    };

}

function parseDate(

    value

){

    const[

        day,

        month,

        year

    ]=value

        .split("-")

        .map(Number);

    return new Date(

        year,

        month-1,

        day

    ).getTime();

}