/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Search Executor
 * Version : V1.0
 * =====================================================
 */

import { searchStyle } from "../../../services/styleEye/styleSearchService.js";

import { renderStyleSelector } from "../selector/styleSelector.js";

import { openStyle } from "./openStyle.js";

/**
 * =====================================================
 * Execute Search
 * =====================================================
 */

export async function performSearch(

    target,

    keyword

){

    keyword = String(

        keyword || ""

    ).trim();

    if(!keyword){

        return;

    }

    const result =

        searchStyle(

            keyword

        );

    switch(result.type){

        /**
         * ==========================================
         * Single Style
         * ==========================================
         */

        case "STYLE":

            await openStyle(

                target,

                result.results[0].styleId

            );

            break;

        /**
         * ==========================================
         * Multiple Styles
         * ==========================================
         */

        case "MULTIPLE":

            target.innerHTML="";

            await renderStyleSelector(

                target,

                result.results,

                async styleId=>{

                    await openStyle(

                        target,

                        styleId

                    );

                }

            );

            break;

        /**
         * ==========================================
         * Not Found
         * ==========================================
         */

        case "NOT_FOUND":

            alert(

                "No matching Style ID or ERP SKU found."

            );

            break;

        /**
         * ==========================================
         * Default
         * ==========================================
         */

        default:

            console.warn(

                "Unknown search result:",

                result

            );

    }

}