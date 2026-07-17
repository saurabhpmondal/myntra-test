/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Search Events
 * Version : V1.0
 * =====================================================
 */

import { performSearch } from "./searchExecutor.js";

/**
 * =====================================================
 * Bind Landing Events
 * =====================================================
 */

export function bindLandingEvents(

    target

){

    const searchBox =

        target.querySelector(

            "#styleEyeSearch"

        );

    const button =

        target.querySelector(

            "#deepDiveButton"

        );

    if(

        !searchBox ||

        !button

    ){

        return;

    }

    async function execute(){

        button.disabled = true;

        button.textContent =

            "Searching...";

        try{

            await performSearch(

                target,

                searchBox.value

            );

        }

        catch(error){

            console.error(

                "Style Eye",

                error

            );

            alert(

                "Unable to load Style Eye."

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

            if(

                event.key==="Enter"

            ){

                execute();

            }

        }

    );

}