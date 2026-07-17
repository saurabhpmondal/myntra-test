/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SJIT Intelligence Header
 * Version : V1.2
 * =====================================================
 */

export async function renderHeader(

    target,

    analysisFrom,

    analysisTo

){

    target.innerHTML=`

<div class="di-header">

    <div class="di-header-left">

        <h1>

            SJIT Intelligence

        </h1>

        <p>

            FC-wise Stock, Sales & Regional Performance

        </p>

        <small
            style="
                color:#64748b;
                display:block;
                margin-top:6px;
            "
        >

            Analysis Period :
            ${formatDate(analysisFrom)}
            -
            ${formatDate(analysisTo)}

        </small>

    </div>

</div>

`;

}

/**
 * =====================================================
 * Format Date
 * =====================================================
 */

function formatDate(

    date

){

    if(!date){

        return "-";

    }

    return date.toLocaleDateString(

        "en-IN",

        {

            day:"2-digit",

            month:"short",

            year:"numeric"

        }

    );

}