import { createComponent } from "../../utils/createComponent.js";

import { Assets } from "../../config/assets.js";

import { Version } from "../../config/version.js";

import { buildMenu } from "./menu.js";

export async function renderSidebar(target){

    await createComponent({

        target,

        html:"src/components/sidebar/sidebar.html",

        css:"src/components/sidebar/sidebar.css",

        data:{

            logo:Assets.logo,

            appName:Version.app,

            tagLine:"Fashion Data Intelligence",

            version:

            Version.release+

            " • "+

            Version.version

        },

        afterRender(){

            buildMenu();

        }

    });

}