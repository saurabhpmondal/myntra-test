/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Insight Renderer
 * Version : V1.0
 * =====================================================
 */

export async function renderInsights(

    target,

    insights

){

    target.innerHTML=

        insights

        .map(

            insight=>`

<div class="dashboard-card">

<h3>

${insight.title}

</h3>

<p>

${insight.message}

</p>

</div>

`

        )

        .join("");

}