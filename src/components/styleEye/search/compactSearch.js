/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Compact Search
 * Version : V1.1
 * =====================================================
 */

import { createComponent } from "../../../utils/createComponent.js";

import { performSearch } from "./searchExecutor.js";

/**
 * =====================================================
 * Render Compact Search
 * =====================================================
 */

export async function renderCompactSearch(

    rootTarget,

    currentKeyword=""

){

    const wrapper =

        document.createElement("div");

    wrapper.className =

        "dashboard-section";

    rootTarget.appendChild(

        wrapper

    );

    await createComponent({

        target:wrapper,

        html:"src/components/styleEye/search/styleSearch.html",

        css:"src/components/styleEye/search/styleSearch.css"

    });

    const container =

        wrapper.querySelector(

            ".style-eye-container"

        );

    container.classList.add(

        "compact"

    );

    const searchBox =

        wrapper.querySelector(

            "#styleEyeSearch"

        );

    searchBox.value =

        currentKeyword;

    searchBox.focus();

    searchBox.select();

    const button =

        wrapper.querySelector(

            "#deepDiveButton"

        );

    async function execute(){

        button.disabled = true;

        button.textContent =

            "Searching...";

        try{

            await performSearch(

                rootTarget,

                searchBox.value

            );

        }

        catch(error){

            console.error(

                "Compact Search",

                error

            );

            alert(

                "Unable to search."

            );

        }

        finally{

            button.disabled = false;

            button.textContent =

                "🔍 Deep Dive";

        }

    }

    button.onclick =

        execute;

    searchBox.addEventListener(

        "keydown",

        event=>{

            if(event.key==="Enter"){

                execute();

            }

        }

    );

}