/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Export Service
 * Version : V1.0
 * =====================================================
 */

export function exportDemandIndex(

    rows=[]

){

    if(

        !rows.length

    ){

        alert(

            "No data available to export."

        );

        return;

    }

    const headers=[

        "Overall Rank",

        "Brand Rank",

        "Style ID",

        "ERP SKU",

        "Brand",

        "Category",

        "ERP Status",

        "Units Sold",

        "Overall DW",

        "Brand DW",

        "Cumulative DW",

        "Badges"

    ];

    const csv=[

        headers.join(",")

    ];

    rows.forEach(

        row=>{

            csv.push([

                row.overallRank,

                row.brandRank,

                escapeValue(

                    row.styleId

                ),

                escapeValue(

                    row.erpSku

                ),

                escapeValue(

                    row.brand

                ),

                escapeValue(

                    row.category

                ),

                escapeValue(

                    row.erpStatus

                ),

                row.unitsSold,

                formatPercent(

                    row.overallDW

                ),

                formatPercent(

                    row.brandDW

                ),

                formatPercent(

                    row.cumulativeDW

                ),

                escapeValue(

                    (

                        row.badges ||

                        []

                    ).join(" | ")

                )

            ].join(","));

        }

    );

    download(

        csv.join("\n")

    );

}

/**
 * =====================================================
 * Download
 * =====================================================
 */

function download(

    csv

){

    const blob=

        new Blob(

            [csv],

            {

                type:"text/csv;charset=utf-8;"

            }

        );

    const url=

        URL.createObjectURL(

            blob

        );

    const link=

        document.createElement(

            "a"

        );

    const date=

        new Date()

        .toISOString()

        .slice(

            0,

            10

        );

    link.href=url;

    link.download=

        `Demand_Index_${date}.csv`;

    document.body.appendChild(

        link

    );

    link.click();

    document.body.removeChild(

        link

    );

    URL.revokeObjectURL(

        url

    );

}

/**
 * =====================================================
 * Escape CSV Value
 * =====================================================
 */

function escapeValue(

    value

){

    return `"${

        String(

            value ??

            ""

        ).replaceAll(

            '"',

            '""'

        )

    }"`;

}

/**
 * =====================================================
 * Format Percentage
 * =====================================================
 */

function formatPercent(

    value

){

    return (

        Number(

            value ||

            0

        ) * 100

    ).toFixed(

        2

    ) + "%";

}