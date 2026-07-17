/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index KPI Renderer
 * Version : V2.0
 * =====================================================
 */

export async function renderKPIs(

    target,

    rows=[]

){

    const totalStyles=

        rows.length;

    const topStyle=

        rows.length

        ?

        rows[0].styleId

        :

        "-";

    const brandSummary={};

    rows.forEach(

        row=>{

            if(

                !brandSummary[

                    row.brand

                ]

            ){

                brandSummary[

                    row.brand

                ]=0;

            }

            brandSummary[

                row.brand

            ]+=

                row.unitsSold;

        }

    );

    let topBrand="-";

    let topBrandSale=0;

    Object.entries(

        brandSummary

    ).forEach(

        ([brand,sales])=>{

            if(

                sales>

                topBrandSale

            ){

                topBrandSale=

                    sales;

                topBrand=

                    brand;

            }

        }

    );

    const coreStyles=

        rows.filter(

            row=>

                row.cumulativeDW<=0.80

        ).length;

    const top10Contribution=(

        rows

        .slice(

            0,

            10

        )

        .reduce(

            (

                total,

                row

            )=>

                total+

                row.overallDW,

            0

        )*100

    ).toFixed(

        2

    )+"%";

    target.innerHTML=`

<div class="di-kpi-card">

    <div class="di-kpi-top">

        <div class="di-kpi-icon">

            📦

        </div>

        <div class="di-kpi-title">

            Total Styles

        </div>

    </div>

    <div class="di-kpi-value">

        ${totalStyles}

    </div>

</div>

<div class="di-kpi-card">

    <div class="di-kpi-top">

        <div class="di-kpi-icon">

            🏆

        </div>

        <div class="di-kpi-title">

            Top Style

        </div>

    </div>

    <div class="di-kpi-value">

        ${topStyle}

    </div>

</div>

<div class="di-kpi-card">

    <div class="di-kpi-top">

        <div class="di-kpi-icon">

            👑

        </div>

        <div class="di-kpi-title">

            Top Brand

        </div>

    </div>

    <div class="di-kpi-value">

        ${topBrand}

    </div>

</div>

<div class="di-kpi-card">

    <div class="di-kpi-top">

        <div class="di-kpi-icon">

            🎯

        </div>

        <div class="di-kpi-title">

            80% DW Styles

        </div>

    </div>

    <div class="di-kpi-value">

        ${coreStyles}

    </div>

</div>

<div class="di-kpi-card">

    <div class="di-kpi-top">

        <div class="di-kpi-icon">

            📈

        </div>

        <div class="di-kpi-title">

            Top 10 Contribution

        </div>

    </div>

    <div class="di-kpi-value">

        ${top10Contribution}

    </div>

</div>

<div class="di-kpi-card">

    <div class="di-kpi-top">

        <div class="di-kpi-icon">

            🚀

        </div>

        <div class="di-kpi-title">

            Movers

        </div>

    </div>

    <div class="di-kpi-value">

            -

    </div>

</div>

`;

}