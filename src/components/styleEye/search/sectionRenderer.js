/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Style Eye Section Renderer
 * Version : V1.0
 * =====================================================
 */

import { renderHeroPanel } from "../hero/heroPanel.js";

import { renderOverviewPanel } from "../overview/overviewPanel.js";

import { renderSalesPanel } from "../sales/salesPanel.js";

import { renderInventoryPanel } from "../inventory/inventoryPanel.js";

import { renderQualityPanel } from "../quality/qualityPanel.js";

import { renderCatalogueFamily } from "../catalogueFamily/catalogueFamily.js";

/**
 * =====================================================
 * Render Complete Dashboard
 * =====================================================
 */

export async function renderDashboardSections(

    target,

    context,

    onStyleSelect

){

    await renderHero(

        target,

        context

    );

    await renderOverview(

        target,

        context

    );

    await renderSales(

        target,

        context

    );

    await renderInventory(

        target,

        context

    );

    await renderQuality(

        target,

        context

    );

    await renderCatalogue(

        target,

        context,

        onStyleSelect

    );

}

/**
 * =====================================================
 * Hero
 * =====================================================
 */

async function renderHero(

    target,

    context

){

    const section =

        createSection(

            target

        );

    await renderHeroPanel(

        section,

        context

    );

}

/**
 * =====================================================
 * Overview
 * =====================================================
 */

async function renderOverview(

    target,

    context

){

    const section =

        createSection(

            target

        );

    await renderOverviewPanel(

        section,

        context

    );

}

/**
 * =====================================================
 * Sales
 * =====================================================
 */

async function renderSales(

    target,

    context

){

    const section =

        createSection(

        target

    );

    await renderSalesPanel(

        section,

        context

    );

}

/**
 * =====================================================
 * Inventory
 * =====================================================
 */

async function renderInventory(

    target,

    context

){

    const section =

        createSection(

            target

        );

    await renderInventoryPanel(

        section,

        context

    );

}

/**
 * =====================================================
 * Quality
 * =====================================================
 */

async function renderQuality(

    target,

    context

){

    const section =

        createSection(

            target

        );

    await renderQualityPanel(

        section,

        context

    );

}

/**
 * =====================================================
 * Catalogue
 * =====================================================
 */

async function renderCatalogue(

    target,

    context,

    onStyleSelect

){

    const section =

        createSection(

            target

        );

    await renderCatalogueFamily(

        section,

        context,

        onStyleSelect

    );

}

/**
 * =====================================================
 * Create Dashboard Section
 * =====================================================
 */

function createSection(

    target

){

    const section =

        document.createElement(

            "div"

        );

    section.className =

        "dashboard-section";

    target.appendChild(

        section

    );

    return section;

}