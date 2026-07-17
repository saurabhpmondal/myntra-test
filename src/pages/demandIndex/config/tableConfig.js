/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index Table Config
 * Version : V3.0
 * =====================================================
 */

/**
 * =====================================================
 * Columns
 * =====================================================
 */

export const DemandIndexColumns=[

    {

        key:"overallRank",

        label:"Overall Rank",

        align:"center",

        renderer:(value,row)=>renderOverallRank(

            value,

            row

        )

    },

    {

        key:"brandRank",

        label:"Brand Rank",

        align:"center"

    },

    {

        key:"styleId",

        label:"Style ID",

        align:"center",

        renderer:value=>`

<a

href="https://www.myntra.com/${value}"

target="_blank"

class="di-style-link">

${value}

</a>

`

    },

    {

        key:"erpSku",

        label:"ERP SKU",

        align:"center"

    },

    {

        key:"brand",

        label:"Brand",

        align:"left"

    },

    {

        key:"category",

        label:"Category",

        align:"left"

    },

    {

        key:"erpStatus",

        label:"ERP Status",

        align:"center"

    },

    {

        key:"unitsSold",

        label:"Units Sold",

        align:"center",

        format:"number"

    },

    {

        key:"overallDW",

        label:"Overall DW",

        align:"center",

        renderer:value=>

`${(value*100).toFixed(2)}%`

    },

    {

        key:"brandDW",

        label:"Brand DW",

        align:"center",

        renderer:value=>

`${(value*100).toFixed(2)}%`

    },

    {

        key:"cumulativeDW",

        label:"Cumulative DW",

        align:"center",

        renderer:value=>

`${(value*100).toFixed(2)}%`

    },

    {

        key:"badges",

        label:"Badges",

        align:"left",

        renderer:renderBadges

    }

];

/**
 * =====================================================
 * Overall Rank Renderer
 * =====================================================
 */

function renderOverallRank(

    value,

    row

){

    if(

        row.rankMovement==="NEW"

    ){

        return `

<div class="di-rank">

<span>

${value}

</span>

<span class="di-rank-new">

🆕

</span>

</div>

`;

    }

    if(

        row.rankMovement==="UP"

    ){

        return `

<div class="di-rank">

<span>

${value}

</span>

<span class="di-rank-up">

▲${row.rankChange}

</span>

</div>

`;

    }

    if(

        row.rankMovement==="DOWN"

    ){

        return `

<div class="di-rank">

<span>

${value}

</span>

<span class="di-rank-down">

▼${Math.abs(

    row.rankChange

)}

</span>

</div>

`;

    }

    return `

<div class="di-rank">

<span>

${value}

</span>

<span class="di-rank-same">

—

</span>

</div>

`;

}

/**
 * =====================================================
 * Badge Renderer
 * =====================================================
 */

function renderBadges(

    badges=[]

){

    if(

        !Array.isArray(

            badges

        ) ||

        !badges.length

    ){

        return "-";

    }

    return badges.map(

        badge=>`

<span class="di-badge">

${badge}

</span>

`

    ).join("");

}

/**
 * =====================================================
 * Build Table Config
 * =====================================================
 */

export function getDemandIndexTableConfig(

    target,

    rows=[]

){

    return{

        target,

        title:

            "Demand Index",

        subtitle:

            `Showing ${rows.length.toLocaleString()} ranked styles`,

        columns:

            DemandIndexColumns,

        rows:

            rows.map(

                row=>({

                    overallRank:

                        row.overallRank,

                    previousRank:

                        row.previousRank,

                    rankChange:

                        row.rankChange,

                    rankMovement:

                        row.rankMovement,

                    brandRank:

                        row.brandRank,

                    styleId:

                        row.styleId,

                    erpSku:

                        row.erpSku,

                    brand:

                        row.brand,

                    category:

                        row.category,

                    erpStatus:

                        row.erpStatus,

                    unitsSold:

                        row.unitsSold,

                    overallDW:

                        row.overallDW,

                    brandDW:

                        row.brandDW,

                    cumulativeDW:

                        row.cumulativeDW,

                    badges:

                        row.badges

                })

            )

    };

}