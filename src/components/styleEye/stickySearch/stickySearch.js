/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Sticky Search
 * Version : V1.1
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

/**
 * =====================================================
 * Render Sticky Search
 * =====================================================
 */

export async function renderStickySearch(

    target,

    onSearch

){

    await createComponent({

        target,

        html:"src/components/styleEye/stickySearch/stickySearch.html",

        css:"src/components/styleEye/stickySearch/stickySearch.css"

    });

    bindEvents(

        target,

        onSearch

    );

}

/**
 * =====================================================
 * Events
 * =====================================================
 */

function bindEvents(

    target,

    onSearch

){

    const searchBox =

        target.querySelector(

            "#stickyStyleSearch"

        );

    const button =

        target.querySelector(

            "#stickyDeepDiveButton"

        );

    async function performSearch(){

        const keyword =

            searchBox.value.trim();

        if(!keyword){

            searchBox.focus();

            return;

        }

        button.disabled = true;

        button.textContent =

            "Searching...";

        try{

            if(typeof onSearch==="function"){

                await onSearch(

                    keyword

                );

            }

        }

        finally{

            button.disabled = false;

            button.textContent =

                "🔍 Deep Dive";

        }

    }

    button.onclick =

        performSearch;

    searchBox.addEventListener(

        "keydown",

        event=>{

            if(event.key==="Enter"){

                performSearch();

            }

        }

    );

}