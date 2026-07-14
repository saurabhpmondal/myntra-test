/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Version : 0.3.0
 * Module : Bootstrap
 * =====================================================
 */

import { showSplash, updateSplash } from "../splash/splash.js";
import { initializeData } from "../services/dataService.js";
import { renderLayout } from "../app/layout.js";
import { hideSplash } from "../splash/splash.js";

document.addEventListener("DOMContentLoaded", async () => {

    console.clear();

    console.log("🔥 Project Phoenix");

    // STEP 1
    showSplash();

    try {

        updateSplash(5, "Starting Phoenix...");

        // STEP 2
        await initializeData();

        updateSplash(95, "Building Dashboard...");

        // STEP 3
        await renderLayout();

        updateSplash(100, "Welcome!");

        // Small delay so users can actually see 100%
        await new Promise(resolve => setTimeout(resolve, 400));

        hideSplash();

        console.log("🚀 Phoenix Ready");

    } catch (error) {

        console.error(error);

    }

});