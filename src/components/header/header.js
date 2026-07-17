import { createComponent } from "../../utils/createComponent.js";

export async function renderHeader(

    target,

    title = "Dashboard"

){

    await createComponent({

        target,

        html:"src/components/header/header.html",

        css:"src/components/header/header.css",

        data:{

            title

        },

        afterRender(){

            document.getElementById(

                "last-refresh"

            ).textContent=

            new Date().toLocaleString();

        }

    });

}