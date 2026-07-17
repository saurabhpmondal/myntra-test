/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Component Engine
 * Author  : Saurabh Mondal & Magical CTO
 * =====================================================
 */

import { loadStyle } from "./loadStyle.js";
import { loadComponent } from "./loadComponent.js";
import { renderIcons } from "./icon.js";

export async function createComponent({

    target,

    html,

    css,

    data = {},

    afterRender = null

}) {

    await loadStyle(css);

    await loadComponent(

        target,

        html,

        data

    );

    renderIcons();

    if (typeof afterRender === "function") {

        afterRender();

    }

}