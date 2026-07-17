/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Premium Style Selector
 * Version : V3.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

/**
 * =====================================================
 * Render Style Selector
 * =====================================================
 */

export async function renderStyleSelector(

    target,

    styles = [],

    onSelect = null

){

    await createComponent({

        target,

        html:"src/components/styleEye/selector/styleSelector.html",

        css:"src/components/styleEye/selector/styleSelector.css"

    });

    document.getElementById(

        "selectorSubtitle"

    ).textContent = buildSubtitle(styles);

    document.getElementById(

        "selectorCount"

    ).textContent =

        `${styles.length} Result${styles.length>1?"s":""}`;

    const container =

        document.getElementById(

            "styleSelectorContainer"

        );

    container.innerHTML =

        styles.map(style=>

            renderCard(style)

        ).join("");

    bindEvents(

        container,

        onSelect

    );

}

/**
 * =====================================================
 * Subtitle
 * =====================================================
 */

function buildSubtitle(styles){

    if(!styles.length){

        return "No matching style found.";

    }

    const erpSku =

        styles[0].erpSku || "";

    if(styles.length===1){

        return

            "1 matching style found.";

    }

    return

        `Multiple listings found for ERP SKU ${erpSku}. Select the required style to continue Style Eye analysis.`;

}

/**
 * =====================================================
 * Render Card
 * =====================================================
 */

function renderCard(style){

    return `

<div class="style-selector-card">

    <div class="style-selector-top">

        ${renderImage(style)}

        <div class="style-selector-content">

            <div class="style-selector-brand">

                <div>

                    <h3>

                        ${style.brand || "-"}

                    </h3>

                    <div class="style-selector-style-name">

                        ${style.styleName || "Saree"}

                    </div>

                </div>

                <div class="style-selector-badges">

                    <div class="style-selector-status">

                        ${style.erpStatus || "-"}

                    </div>

                    <div class="${style.isActive ? "selector-active" : "selector-inactive"}">

                        ${style.badge}

                        ${style.overallStatus}

                    </div>

                </div>

            </div>

            <div class="style-selector-row">

                <span class="style-selector-label">

                    Style ID

                </span>

                <span class="style-selector-value">

                    ${style.styleId}

                </span>

            </div>

            <div class="style-selector-row">

                <span class="style-selector-label">

                    ERP SKU

                </span>

                <span class="style-selector-value">

                    ${style.erpSku}

                </span>

            </div>

            <div class="style-selector-row">

                <span class="style-selector-label">

                    Style Status

                </span>

                <span class="style-selector-value">

                    ${style.styleStatus || "-"}

                </span>

            </div>

            <div class="style-selector-row">

                <span class="style-selector-label">

                    Listing Status

                </span>

                <span class="style-selector-value">

                    ${style.listingStatus || "-"}

                </span>

            </div>

            <div class="style-selector-row">

                <span class="style-selector-label">

                    Rating

                </span>

                <span class="style-selector-value">

                    ${renderRating(style.rating)}

                </span>

            </div>

            <div class="style-selector-row">

                <span class="style-selector-label">

                    Launch Age

                </span>

                <span class="style-selector-value">

                    ${style.launchAge}

                </span>

            </div>

        </div>

    </div>

    <div class="style-selector-divider"></div>

    ${renderKpis(style)}

    ${renderFooter(style)}

</div>

`;

}

/**
 * =====================================================
 * Image
 * =====================================================
 */

function renderImage(style){

    if(style.imageUrl){

        return `

<div
    class="style-selector-image"
    data-image="${style.imageUrl}"
    title="Click to enlarge"
>

    <img
        src="${style.imageUrl}"
        alt="${style.styleId}"
        loading="lazy"
    >

</div>

`;

    }

    return `

<div class="style-selector-image">

    <div class="style-selector-no-image">

        👗

        <span>

            No Image

        </span>

    </div>

</div>

`;

}

/**
 * =====================================================
 * KPI Section
 * =====================================================
 */

function renderKpis(style){

    return `

<div class="style-selector-kpis">

    <div class="selector-kpi">

        <div class="selector-kpi-label">

            MRP

        </div>

        <div class="selector-kpi-value">

            ${formatCurrency(style.mrp)}

        </div>

    </div>

    <div class="selector-kpi">

        <div class="selector-kpi-label">

            TP

        </div>

        <div class="selector-kpi-value">

            ${formatCurrency(style.tp)}

        </div>

    </div>

    <div class="selector-kpi">

        <div class="selector-kpi-label">

            Category

        </div>

        <div class="selector-kpi-value">

            ${style.category || "-"}

        </div>

    </div>

    <div class="selector-kpi">

        <div class="selector-kpi-label">

            Brand

        </div>

        <div class="selector-kpi-value">

            ${style.brand || "-"}

        </div>

    </div>

</div>

`;

}

/**
 * =====================================================
 * Footer
 * =====================================================
 */

function renderFooter(style){

    return `

<div class="style-selector-footer">

    <button

        class="style-selector-button"

        data-style="${style.styleId}"

    >

        🔍 Deep Dive

    </button>

</div>

`;

}

/**
 * =====================================================
 * Rating
 * =====================================================
 */

function renderRating(rating){

    rating = Number(rating || 0);

    if(!rating){

        return "-";

    }

    return `⭐ ${rating.toFixed(1)}`;

}

/**
 * =====================================================
 * Bind Events
 * =====================================================
 */

function bindEvents(

    container,

    onSelect

){

    container

        .querySelectorAll(

            ".style-selector-button"

        )

        .forEach(button=>{

            button.onclick=()=>{

                if(

                    typeof onSelect==="function"

                ){

                    onSelect(

                        button.dataset.style

                    );

                }

            };

        });

    container

        .querySelectorAll(

            ".style-selector-image"

        )

        .forEach(image=>{

            image.onclick=()=>{

                const imageUrl =

                    image.dataset.image;

                if(!imageUrl){

                    return;

                }

                /*
                 * ==========================================
                 * Phoenix Image Viewer
                 * (Temporary)
                 * ==========================================
                 */

                window.open(

                    imageUrl,

                    "_blank"

                );

            };

        });

}

/**
 * =====================================================
 * Currency
 * =====================================================
 */

function formatCurrency(value){

    value = Number(

        value || 0

    );

    if(!value){

        return "-";

    }

    return value.toLocaleString(

        "en-IN",

        {

            style:"currency",

            currency:"INR",

            maximumFractionDigits:0

        }

    );

}

/**
 * =====================================================
 * Date
 * =====================================================
 */

function formatDate(date){

    if(!date){

        return "-";

    }

    const value =

        new Date(date);

    if(

        isNaN(

            value.getTime()

        )

    ){

        return date;

    }

    return value.toLocaleDateString(

        "en-IN",

        {

            day:"2-digit",

            month:"short",

            year:"numeric"

        }

    );

}

/**
 * =====================================================
 * Launch Age
 * =====================================================
 */

function calculateLaunchAge(date){

    if(!date){

        return "-";

    }

    const launch =

        new Date(date);

    if(

        isNaN(

            launch.getTime()

        )

    ){

        return "-";

    }

    const today =

        new Date();

    const diff =

        today-launch;

    const days =

        Math.floor(

            diff/86400000

        );

    if(days<30){

        return `${days} Days`;

    }

    if(days<365){

        return `${Math.floor(days/30)} Months`;

    }

    return `${Math.floor(days/365)} Years`;

}

/**
 * =====================================================
 * Status Badge Class
 * =====================================================
 */

function getStatusClass(style){

    return style.isActive

        ?

        "selector-active"

        :

        "selector-inactive";

}

/**
 * =====================================================
 * Safe Text
 * =====================================================
 */

function safe(value){

    if(

        value===undefined ||

        value===null ||

        value===""

    ){

        return "-";

    }

    return String(value);

}

/**
 * =====================================================
 * Safe Number
 * =====================================================
 */

function safeNumber(value){

    const number =

        Number(value);

    if(

        isNaN(number)

    ){

        return 0;

    }

    return number;

}

/**
 * =====================================================
 * Rating Color
 * =====================================================
 */

function getRatingColor(rating){

    rating = safeNumber(rating);

    if(rating>=4.5){

        return "#16A34A";

    }

    if(rating>=4){

        return "#CA8A04";

    }

    return "#DC2626";

}

/**
 * =====================================================
 * Image Error Handler
 * =====================================================
 */

document.addEventListener(

    "error",

    event=>{

        const target =

            event.target;

        if(

            target.tagName!=="IMG"

        ){

            return;

        }

        target.style.display="none";

        const wrapper =

            target.closest(

                ".style-selector-image"

            );

        if(!wrapper){

            return;

        }

        wrapper.innerHTML =

        `

<div class="style-selector-no-image">

    👗

    <span>

        No Image

    </span>

</div>

`;

    },

    true

);

/**
 * =====================================================
 * Card Border
 * =====================================================
 */

function getCardClass(style){

    return style.isActive

        ?

        "style-selector-card selector-card-active"

        :

        "style-selector-card selector-card-inactive";

}

/**
 * =====================================================
 * Build Tooltip
 * =====================================================
 */

function buildTooltip(style){

    return [

        `Brand : ${safe(style.brand)}`,

        `Style : ${safe(style.styleId)}`,

        `ERP : ${safe(style.erpSku)}`,

        `ERP Status : ${safe(style.erpStatus)}`,

        `Style Status : ${safe(style.styleStatus)}`,

        `Listing Status : ${safe(style.listingStatus)}`,

        `Overall : ${safe(style.overallStatus)}`

    ].join("\n");

}

/**
 * =====================================================
 * Build Overall Badge
 * =====================================================
 */

function renderOverallBadge(style){

    return `

<div class="${getStatusClass(style)}">

    ${style.badge}

    ${safe(style.overallStatus)}

</div>

`;

}

/**
 * =====================================================
 * Format Launch Date
 * =====================================================
 */

function renderLaunchDate(style){

    return formatDate(

        style.launchDate

    );

}

/**
 * =====================================================
 * Format Launch Age
 * =====================================================
 */

function renderLaunchAge(style){

    return calculateLaunchAge(

        style.launchDate

    );

}

/**
 * =====================================================
 * Format Rating
 * =====================================================
 */

function renderRatingBadge(style){

    const rating =

        safeNumber(

            style.rating

        );

    if(!rating){

        return "-";

    }

    return `

<span
    class="selector-rating"
    style="color:${getRatingColor(rating)}"
>

    ⭐ ${rating.toFixed(1)}

</span>

`;

}

/**
 * =====================================================
 * Image Available
 * =====================================================
 */

function hasImage(style){

    return Boolean(

        style.imageUrl

    );

}

/**
 * =====================================================
 * Active
 * =====================================================
 */

function isStyleActive(style){

    return Boolean(

        style.isActive

    );

}

/**
 * =====================================================
 * Debug
 * Remove later if not required
 * =====================================================
 */

function debugStyle(style){

    return {

        styleId:style.styleId,

        erpSku:style.erpSku,

        brand:style.brand,

        styleName:style.styleName,

        category:style.category,

        erpStatus:style.erpStatus,

        styleStatus:style.styleStatus,

        listingStatus:style.listingStatus,

        overallStatus:style.overallStatus,

        rating:style.rating,

        launchDate:style.launchDate,

        launchAge:style.launchAge,

        imageUrl:style.imageUrl

    };

}

/**
 * =====================================================
 * End Of File
 * Version : V3.0
 * =====================================================
 */