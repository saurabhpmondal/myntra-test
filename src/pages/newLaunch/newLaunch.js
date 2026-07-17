/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : New Launch Intelligence
 * Version : V2.0
 * =====================================================
 */

import {

    initializeNewLaunch,

    destroyNewLaunch as destroyService

}

from "./services/newLaunchService.js";

let pageContainer=null;

/**
 * =====================================================
 * Render
 * =====================================================
 */

export async function renderNewLaunch(

    target

){

    pageContainer=

        target;

    await initializeNewLaunch(

        pageContainer

    );

}

/**
 * =====================================================
 * Destroy
 * =====================================================
 */

export function destroyNewLaunch(){

    destroyService();

    pageContainer=null;

}