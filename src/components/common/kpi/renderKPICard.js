/**
 * =====================================================
 * Project Phoenix
 * Common Component
 * Module  : KPI Card
 * Version : V1.0
 * =====================================================
 */

export async function renderKPICard(

    target,

    config={}

){

    const{

        title,

        data

    }=config;

    target.innerHTML=`

<div class="dashboard-card kpi-card">

    <div class="kpi-title">

        ${title}

    </div>

    <div class="kpi-gmv">

        ${formatCurrency(

            data?.gmv?.current

        )}

    </div>

    <div class="kpi-growth">

        ${buildGrowth(

            data?.gmv?.growth

        )}

    </div>

    <div class="kpi-divider"></div>

    <div class="kpi-units">

        ${formatNumber(

            data?.units?.current

        )} Units

    </div>

    <div class="kpi-growth-small">

        ${buildGrowth(

            data?.units?.growth

        )}

    </div>

</div>

`;

}

/**
 * =====================================================
 * Growth
 * =====================================================
 */

function buildGrowth(

    growth={}

){

    const{

        value=0,

        direction="flat"

    }=growth;

    const icon=

        direction==="up"

        ?"▲"

        :

        direction==="down"

        ?"▼"

        :

        "■";

    return `

<span class="growth-${direction}">

${icon}

${Math.abs(

    value

).toFixed(

    1

)}%

</span>

`;

}

/**
 * =====================================================
 * Currency
 * =====================================================
 */

function formatCurrency(

    value=0

){

    return new Intl.NumberFormat(

        "en-IN",

        {

            style:"currency",

            currency:"INR",

            maximumFractionDigits:0

        }

    ).format(

        value

    );

}

/**
 * =====================================================
 * Number
 * =====================================================
 */

function formatNumber(

    value=0

){

    return new Intl.NumberFormat(

        "en-IN"

    ).format(

        value

    );

}