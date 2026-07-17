/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Demand Index Filters
 * Version : V2.0
 * =====================================================
 */

export async function renderFilters(

    target

){

    target.innerHTML=`

<div class="demand-filter-bar">

    <select id="diBrandFilter">

        <option value="">

            All Brands

        </option>

    </select>

    <select id="diCategoryFilter">

        <option value="">

            All Categories

        </option>

    </select>

    <select id="diStatusFilter">

        <option value="">

            All ERP Status

        </option>

    </select>

    <select id="diDateFilter">

        <option value="7">

            Last 7 Days

        </option>

        <option
            value="30"
            selected>

            Last 30 Days

        </option>

        <option value="60">

            Last 60 Days

        </option>

        <option value="90">

            Last 90 Days

        </option>

    </select>

    <input

        id="diSearch"

        type="text"

        placeholder="Search Style ID / ERP SKU">

    <button

        id="diResetFilters"

        class="di-reset-btn">

        Reset

    </button>

</div>

`;

}