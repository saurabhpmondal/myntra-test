/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : New Launch Header
 * Version : V2.0
 * =====================================================
 */

import {

    NewLaunchStore

}

from "../services/newLaunchStore.js";

export async function renderHeader(

    target,

    store=NewLaunchStore

){

    const filters=

        store.filters||{};

    const brands=[

        ...new Set(

            (store.launchRows||[])

            .map(

                row=>row.brand

            )

            .filter(Boolean)

        )

    ].sort();

    target.innerHTML=`

<div class="di-header">

    <div class="di-header-left">

        <h1>

            New Launch Intelligence

        </h1>

        <p>

            Track launch performance, identify winning styles and dead launches.

        </p>

    </div>

    <div class="di-header-right">

        <div class="launch-filter-row">

            <select

                id="nlLaunchWindow"

                class="di-select"

            >

                <option value="30" ${filters.launchWindow===30?"selected":""}>

                    Last 30 Days

                </option>

                <option value="45" ${filters.launchWindow===45?"selected":""}>

                    Last 45 Days

                </option>

                <option value="60" ${filters.launchWindow===60?"selected":""}>

                    Last 60 Days

                </option>

                <option value="90" ${filters.launchWindow===90?"selected":""}>

                    Last 90 Days

                </option>

            </select>

            <select

                id="nlBrand"

                class="di-select"

            >

                <option value="">

                    All Brands

                </option>

                ${brands.map(

                    brand=>`

<option

value="${brand}"

${filters.brand===brand?"selected":""}

>

${brand}

</option>

`

                ).join("")}

            </select>

            <select

                id="nlStatus"

                class="di-select"

            >

                <option value="" ${filters.status===""?"selected":""}>

                    All Status

                </option>

                <option value="🚀 Hot" ${filters.status==="🚀 Hot"?"selected":""}>

                    🚀 Hot

                </option>

                <option value="🟢 Good" ${filters.status==="🟢 Good"?"selected":""}>

                    🟢 Good

                </option>

                <option value="🟡 Slow" ${filters.status==="🟡 Slow"?"selected":""}>

                    🟡 Slow

                </option>

                <option value="🔴 Dead" ${filters.status==="🔴 Dead"?"selected":""}>

                    🔴 Dead

                </option>

            </select>

            <input

                id="nlSearch"

                class="di-search"

                type="text"

                value="${filters.search||""}"

                placeholder="Search Style ID"

            >

        </div>

        <div class="launch-header-info">

            <span class="launch-success">

                Success Rate :

                <b>

                    ${Number(

                        store.kpis?.successRate||0

                    ).toFixed(1)}%

                </b>

            </span>

            <span class="launch-updated">

                Last Updated :

                ${formatDate(

                    store.generatedOn

                )}

            </span>

        </div>

    </div>

</div>

`;

}

function formatDate(

    date

){

    if(

        !date

    ){

        return "-";

    }

    return date.toLocaleString(

        "en-IN",

        {

            day:"2-digit",

            month:"short",

            year:"numeric",

            hour:"2-digit",

            minute:"2-digit"

        }

    );

}