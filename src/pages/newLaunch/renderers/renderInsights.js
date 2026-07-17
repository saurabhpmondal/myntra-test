/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : New Launch Insights Renderer
 * Version : V1.0
 * =====================================================
 */

export async function renderInsights(

    target,

    insights=[]

){

    target.innerHTML=`

<div class="insight-grid">

    ${insights

        .map(

            buildInsight

        )

        .join(

            ""

        )}

</div>

`;

}

/**
 * =====================================================
 * Insight Card
 * =====================================================
 */

function buildInsight(

    insight

){

    return `

<div class="insight-card">

    <div class="insight-title">

        ${insight.title}

    </div>

    <div

        style="

            font-size:24px;

            font-weight:700;

            color:#111827;

            margin:12px 0;

        "

    >

        ${insight.value}

    </div>

    <div class="insight-text">

        ${insight.description}

    </div>

</div>

`;

}