/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Listing Status Service
 * Version : V1.0
 * =====================================================
 */

import { LookupStore } from "../lookupService.js";

/**
 * =====================================================
 * Get Listing Status
 * =====================================================
 */

export function getListingStatus(styleId){

    styleId = String(

        styleId || ""

    ).trim();

    const listing =

        LookupStore.listingByStyleId[styleId];

    if(!listing){

        return{

            styleStatus:"",

            listingStatus:"",

            overallStatus:"INACTIVE",

            badge:"🔴",

            isActive:false

        };

    }

    const styleStatus =

        String(

            listing.styleStatus || ""

        ).trim();

    const listingStatus =

        String(

            listing.listingStatus || ""

        ).trim();

    const styleActive =

        styleStatus.toUpperCase()==="ACTIVE";

    const listingActive =

        listingStatus.toUpperCase()==="ACTIVE";

    const isActive =

        styleActive && listingActive;

    return{

        styleStatus,

        listingStatus,

        overallStatus:

            isActive

            ?

            "ACTIVE"

            :

            "INACTIVE",

        badge:

            isActive

            ?

            "🟢"

            :

            "🔴",

        isActive

    };

}