/**
 * =====================================================
 * Project Phoenix
 * Common Component
 * Module  : Advanced Table
 * Version : V3.1
 * =====================================================
 */

/**
 * =====================================================
 * Render Advanced Table
 * =====================================================
 */

export async function renderAdvancedTable(

    target,

    config={}

){

    if(

        !target

    ){

        console.warn(

            "AdvancedTable target not found",

            config?.title

        );

        return;

    }

    const{

        title="",

        subtitle="",

        fixedColumns=[],

        metrics=[],

        rows=[]

    }=config;

    const safeRows=

        Array.isArray(

            rows

        )

        ?rows

        :[];

    const columns=

        buildColumns(

            fixedColumns,

            metrics

        );

    target.innerHTML=`

<div class="dashboard-card">

    <div class="dashboard-header">

        <div>

            <h3>${title}</h3>

            <p>${subtitle}</p>

        </div>

    </div>

    <div class="table-wrapper">

        <table class="phoenix-table advanced-table">

            <thead>

                ${buildHeader(

                    fixedColumns,

                    metrics

                )}

            </thead>

            <tbody>

                ${buildRows(

                    columns,

                    safeRows

                )}

            </tbody>

        </table>

    </div>

</div>

`;

}

/**
 * =====================================================
 * Header
 * =====================================================
 */

function buildHeader(

    fixedColumns,

    metrics

){

    const top=[];

    const bottom=[];

    fixedColumns.forEach(

        column=>{

            top.push(

                `<th rowspan="2">${column.label}</th>`

            );

        }

    );

    metrics.forEach(

        metric=>{

            top.push(

                `<th colspan="3">${metric.label}</th>`

            );

            bottom.push("<th>GMV</th>");
            bottom.push("<th>Units</th>");
            bottom.push("<th>Growth</th>");

        }

    );

    return`

<tr>

${top.join("")}

</tr>

<tr>

${bottom.join("")}

</tr>

`;

}

/**
 * =====================================================
 * Build Columns
 * =====================================================
 */

function buildColumns(

    fixedColumns,

    metrics

){

    const columns=[];

    fixedColumns.forEach(

        column=>

            columns.push(

                column

            )

    );

    metrics.forEach(

        metric=>{

            columns.push({

                key:`${metric.key}.gmv.current`,

                type:"currency"

            });

            columns.push({

                key:`${metric.key}.units.current`,

                type:"number"

            });

            columns.push({

                key:`${metric.key}.units.growth.value`,

                type:"growth"

            });

        }

    );

    return columns;

}

/**
 * =====================================================
 * Build Rows
 * =====================================================
 */

function buildRows(

    columns,

    rows

){

    if(

        !rows.length

    ){

        return`

<tr>

<td colspan="${columns.length}">

No data available

</td>

</tr>

`;

    }

    return rows.map(

        row=>`

<tr>

${columns.map(

column=>`

<td>

${renderCell(

column,

row

)}

</td>

`

).join("")}

</tr>

`

    ).join("");

}

/**
 * =====================================================
 * Render Cell
 * =====================================================
 */

function renderCell(

    column,

    row

){

    const value=

        read(

            row,

            column.key

        );

    switch(

        column.type

    ){

        case"style":

            return renderStyleLink(value);

        case"currency":

            return formatCurrency(value);

        case"number":

            return formatNumber(value);

        case"percent":

            return formatPercent(value);

        case"growth":

            return formatGrowth(value);

        default:

            return value??"-";

    }

}

function read(

    object,

    path

){

    if(!path){

        return null;

    }

    return path

        .split(".")

        .reduce(

            (

                value,

                key

            )=>

                value?.[key],

            object

        );

}

function renderStyleLink(

    styleId

){

    if(!styleId){

        return "-";

    }

    return `

<a

href="https://www.myntra.com/${styleId}"

target="_blank"

class="phoenix-style-link"

>

${styleId}

</a>

`;

}

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

        Number(

            value||0

        )

    );

}

function formatNumber(

    value=0

){

    return new Intl.NumberFormat(

        "en-IN"

    ).format(

        Number(

            value||0

        )

    );

}

function formatPercent(

    value=0

){

    return `${Number(value||0).toFixed(2)}%`;

}

function formatGrowth(

    value=0

){

    value=Number(value||0);

    const cls=

        value>0

        ?"growth-up"

        :

        value<0

        ?"growth-down"

        :

        "growth-flat";

    const icon=

        value>0

        ?"▲"

        :

        value<0

        ?"▼"

        :

        "■";

    return `

<span class="${cls}">

${icon}

${Math.abs(value).toFixed(1)}%

</span>

`;

}