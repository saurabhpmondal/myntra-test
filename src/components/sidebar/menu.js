/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Sidebar Menu
 * Version : V3.0
 * =====================================================
 */

import { Navigation } from "../../config/navigation.js";

import { renderIcons } from "../../utils/icon.js";

import { openPage } from "../../app/pageManager.js";

export function buildMenu(){

    const menu=

        document.querySelector(

            ".sidebar-menu"

        );

    menu.innerHTML="";

    Navigation.forEach(

        (page,index)=>{

            /**
             * ==========================================
             * Divider
             * ==========================================
             */

            if(page.divider){

                const divider=

                    document.createElement(

                        "div"

                    );

                divider.className=

                    "sidebar-divider";

                divider.innerHTML=`

<div class="sidebar-divider-line"></div>

<div class="sidebar-divider-title">

    ${page.title}

</div>

`;

                menu.appendChild(

                    divider

                );

                return;

            }

            /**
             * ==========================================
             * Menu Item
             * ==========================================
             */

            const item=

                document.createElement(

                    "button"

                );

            item.className=

                "sidebar-item";

            if(

                index===0

            ){

                item.classList.add(

                    "active"

                );

            }

            item.dataset.page=

                page.id;

            item.innerHTML=`

<i data-lucide="${page.icon}"></i>

<span>

${page.title}

</span>

`;

            item.onclick=

            async()=>{

                /**
                 * ======================================
                 * External Dashboard
                 * ======================================
                 */

                if(

                    page.external

                ){

                    window.open(

                        page.url,

                        "_blank",

                        "noopener,noreferrer"

                    );

                    return;

                }

                /**
                 * ======================================
                 * Internal Pages
                 * ======================================
                 */

                document

                .querySelectorAll(

                    ".sidebar-item"

                )

                .forEach(

                    button=>{

                        button

                        .classList

                        .remove(

                            "active"

                        );

                    }

                );

                item

                .classList

                .add(

                    "active"

                );

                await openPage(

                    page.id

                );

            };

            menu.appendChild(

                item

            );

        }

    );

    renderIcons();

}