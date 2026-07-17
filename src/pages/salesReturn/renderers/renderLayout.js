/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Layout
 * Version : V12.0
 * =====================================================
 */

export async function renderLayout(

    target

){

    target.innerHTML = `

<div
id="salesReturnPage"
class="page">

    <div
    class="page-header">

        <h2>

            Sales & Return

        </h2>

        <p>

            Phoenix V12

        </p>

    </div>

    <div
    id="salesReturnKPIs">

    </div>

    <div
    id="salesReturnPOType">

    </div>

    <div
    id="salesReturnBrand">

    </div>

    <div
    id="salesReturnStyle">

    </div>

    <div
    id="salesReturnReason">

    </div>

    <div
    id="salesReturnTrend">

    </div>

</div>

`;

}