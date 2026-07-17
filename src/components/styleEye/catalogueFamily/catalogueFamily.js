/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Catalogue Family
 * Version : V2.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { buildCatalogueFamily } from "../../../services/styleEye/catalogueFamily/catalogueFamilyService.js";

import { formatNumber } from "../../../utils/formatter.js";

/**
 * =====================================================
 * Render
 * =====================================================
 */

export async function renderCatalogueFamily(

    target,

    context,

    onStyleSelect

){

    await createComponent({

        target,

        html:"src/components/styleEye/catalogueFamily/catalogueFamily.html",

        css:"src/components/styleEye/catalogueFamily/catalogueFamily.css"

    });

    const catalogue =

        buildCatalogueFamily(context);

    if(!catalogue){

        target.innerHTML=`

<div class="dashboard-card">

Unable to load Catalogue Family.

</div>

`;

        return;

    }

    renderSummary(

        target,

        catalogue

    );

    renderCarousel(

        target,

        catalogue,

        onStyleSelect

    );

}

/**
 * =====================================================
 * Summary
 * =====================================================
 */

function renderSummary(

    target,

    catalogue

){

    const container=

        target.querySelector(

            "#catalogueSummary"

        );

    const summary=

        catalogue.summary;

    const header=

        catalogue.header;

    container.className=

        "catalogue-summary";

    container.innerHTML=`

<div class="catalogue-title">

<div>

<div class="catalogue-heading">

${header.title}

</div>

<div class="catalogue-subtitle">

${header.subtitle}

</div>

</div>

</div>

<div class="catalogue-kpi-grid">

<div class="catalogue-kpi">

<div class="catalogue-kpi-value">

${summary.styleCount}

</div>

<div class="catalogue-kpi-label">

Styles

</div>

</div>

<div class="catalogue-kpi">

<div class="catalogue-kpi-value">

${summary.active}

</div>

<div class="catalogue-kpi-label">

Active

</div>

</div>

<div class="catalogue-kpi">

<div class="catalogue-kpi-value">

${summary.inactive}

</div>

<div class="catalogue-kpi-label">

Inactive

</div>

</div>

<div class="catalogue-kpi">

<div class="catalogue-kpi-value">

${formatNumber(

summary.totalSale

)}

</div>

<div class="catalogue-kpi-label">

90D Sales

</div>

</div>

<div class="catalogue-kpi">

<div class="catalogue-kpi-value">

⭐ ${summary.avgRating.toFixed(1)}

</div>

<div class="catalogue-kpi-label">

Average Rating

</div>

</div>

</div>

`;

}

/**
 * =====================================================
 * Carousel
 * =====================================================
 */

function renderCarousel(

    target,

    catalogue,

    onStyleSelect

){

    const container =

        target.querySelector(

            "#catalogueCarousel"

        );

    const tiles =

        catalogue.data.tiles;

    container.innerHTML =

        tiles.map(tile=>`

<div class="catalogue-tile ${tile.isCurrent ? "catalogue-current" : ""}">

    <div class="catalogue-image">

        ${tile.imageUrl

            ?

            `<img src="${tile.imageUrl}" alt="${tile.styleId}">`

            :

            `<div class="catalogue-placeholder">

                👗

            </div>`

        }

    </div>

    <div class="catalogue-body">

        <div class="catalogue-rating">

            ⭐ ${Number(tile.rating || 0).toFixed(1)}

        </div>

        <div class="catalogue-style">

            ${tile.styleId}

        </div>

        <div class="catalogue-status">

            ${tile.status || "-"}

        </div>

        <div class="catalogue-sales">

            <strong>

                ${formatNumber(tile.sale90D)}

            </strong>

            Units Sold

        </div>

        ${tile.isCurrent

            ?

            `<div class="catalogue-current-badge">

                CURRENT STYLE

            </div>`

            :

            `<button

                class="catalogue-button"

                data-style="${tile.styleId}"

            >

                View Style →

            </button>`

        }

    </div>

</div>

`).join("");

    container

        .querySelectorAll(

            ".catalogue-button"

        )

        .forEach(button=>{

            button.onclick = ()=>{

                if(onStyleSelect){

                    onStyleSelect(

                        button.dataset.style

                    );

                }

            };

        });

}