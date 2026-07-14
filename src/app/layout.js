/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Layout Engine
 * Version : V2.0
 * =====================================================
 */

import { renderSidebar } from "../components/sidebar/sidebar.js";
import { renderHeader } from "../components/header/header.js";
import { renderFilterBar } from "../components/filterBar/filterBar.js";
import { renderCommandPalette } from "../components/commandPalette/commandPalette.js";

import {
    initializePageManager,
    openPage
} from "./pageManager.js";

export async function renderLayout(){

    const root = document.getElementById("root");

    root.innerHTML = `

        <div class="app-shell">

            <div id="sidebar"></div>

            <div class="app-main">

                <div id="header"></div>

                <div id="filterbar"></div>

                <main id="content"></main>

                <footer id="footer"></footer>

            </div>

        </div>

    `;

    // ------------------------------------
    // Sidebar
    // ------------------------------------

    await renderSidebar(

        document.getElementById("sidebar")

    );

    // ------------------------------------
    // Header
    // ------------------------------------

    await renderHeader(

        document.getElementById("header"),

        "Dashboard"

    );

    // ------------------------------------
    // Filters
    // ------------------------------------

    await renderFilterBar(

        document.getElementById("filterbar")

    );

    // ------------------------------------
    // Page Manager
    // ------------------------------------

    initializePageManager(

        document.getElementById("content")

    );

    // ------------------------------------
    // Default Page
    // ------------------------------------

    await openPage("dashboard");

    // ------------------------------------
    // Command Palette
    // ------------------------------------

    await renderCommandPalette();

}