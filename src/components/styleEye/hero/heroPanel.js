/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Hero Panel
 * Version : V2.0
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

export async function renderHeroPanel(

    target,

    context

){

    await createComponent({

        target,

        html:"src/components/styleEye/hero/heroPanel.html",

        css:"src/components/styleEye/hero/heroPanel.css"

    });

    if(!context){

        target.innerHTML="";

        return;

    }

    const identity = context.identity || {};

    const pricing = context.pricing || {};

    /* ==========================================
       Hero Details
    ========================================== */

    document.getElementById("heroBrand").textContent =

        identity.brand || "-";

    document.getElementById("heroCategory").textContent =

        identity.category || "-";

    document.getElementById("heroStatus").textContent =

        identity.erpStatus || "-";

    document.getElementById("heroStyleId").textContent =

        identity.styleId || "-";

    document.getElementById("heroErpSku").textContent =

        identity.erpSku || "-";

    document.getElementById("heroLaunchDate").textContent =

        formatDate(identity.launchDate);

    document.getElementById("heroLaunchAge").textContent =

        calculateAge(identity.launchDate);

    document.getElementById("heroMrp").textContent =

        formatCurrency(pricing.mrp);

    document.getElementById("heroTp").textContent =

        formatCurrency(pricing.tp);

    document.getElementById("heroBrandSmall").textContent =

        identity.brand || "-";

    document.getElementById("heroCategorySmall").textContent =

        identity.category || "-";

    /* ==========================================
       Hero Image
    ========================================== */

    bindHeroImage(identity);

}

/**
 * =====================================================
 * Image
 * =====================================================
 */

function bindHeroImage(identity){

    const image =

        document.getElementById("heroImage");

    const placeholder =

        document.getElementById(

            "heroImagePlaceholder"

        );

    const imageUrl =

        String(

            identity.imageUrl || ""

        ).trim();

    if(!imageUrl){

        image.style.display="none";

        placeholder.style.display="flex";

        return;

    }

    image.src=imageUrl;

    image.style.display="block";

    placeholder.style.display="none";

    image.onerror=()=>{

        image.style.display="none";

        placeholder.style.display="flex";

    };

    image.onclick=()=>{

        window.open(

            imageUrl,

            "_blank"

        );

    };

}

/**
 * ==========================================
 * Launch Age
 * ==========================================
 */

function calculateAge(date){

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

    return `${days} Days`;

}

/**
 * ==========================================
 * Currency
 * ==========================================
 */

function formatCurrency(value){

    const amount =

        Number(value || 0);

    if(!amount){

        return "-";

    }

    return amount.toLocaleString(

        "en-IN",

        {

            style:"currency",

            currency:"INR",

            maximumFractionDigits:0

        }

    );

}

/**
 * ==========================================
 * Date
 * ==========================================
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