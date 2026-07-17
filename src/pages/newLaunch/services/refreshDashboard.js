/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Refresh Dashboard
 * Version : V1.2
 * =====================================================
 */

import {

    NewLaunchStore

}

from "./newLaunchStore.js";

import {

    buildKPIs

}

from "../calculations/buildKPIs.js";

import {

    buildInsights

}

from "../calculations/buildInsights.js";

import {

    buildLaunchPerformance

}

from "../calculations/buildLaunchPerformance.js";

import {

    buildLaunchAgeAnalysis

}

from "../calculations/buildLaunchAgeAnalysis.js";

import {

    buildWeeklyLaunch

}

from "../calculations/buildWeeklyLaunch.js";

import {

    buildDeadLaunch

}

from "../calculations/buildDeadLaunch.js";

import {

    renderHeader

}

from "../renderers/renderHeader.js";

import {

    renderKPIs

}

from "../renderers/renderKPIs.js";

import {

    renderInsights

}

from "../renderers/renderInsights.js";

import {

    renderLaunchPerformance

}

from "../renderers/renderLaunchPerformance.js";

import {

    renderLaunchAgeAnalysis

}

from "../renderers/renderLaunchAgeAnalysis.js";

import {

    renderWeeklyLaunch

}

from "../renderers/renderWeeklyLaunch.js";

import {

    renderDeadLaunch

}

from "../renderers/renderDeadLaunch.js";

export async function refreshDashboard(){

    /**
     * KPI
     */

    NewLaunchStore.kpis=

        buildKPIs(

            NewLaunchStore.filteredRows

        );

    /**
     * Insights
     */

    NewLaunchStore.insights=

        buildInsights(

            NewLaunchStore.filteredRows,

            NewLaunchStore.kpis

        );

    /**
     * Reports
     */

    NewLaunchStore.launchAgeAnalysis=

        buildLaunchAgeAnalysis();

    NewLaunchStore.weeklyPerformance=

        buildWeeklyLaunch(

            NewLaunchStore.filteredRows

        );

    NewLaunchStore.launchPerformance=

        buildLaunchPerformance(

            NewLaunchStore.filteredRows

        );

    NewLaunchStore.deadLaunches=

        buildDeadLaunch(

            NewLaunchStore.filteredRows

        );

    /**
     * Render
     */

    await renderHeader(

        document.getElementById(

            "newLaunchHeader"

        ),

        NewLaunchStore

    );

    await renderKPIs(

        document.getElementById(

            "newLaunchKPIs"

        ),

        NewLaunchStore.kpis

    );

    await renderInsights(

        document.getElementById(

            "newLaunchInsights"

        ),

        NewLaunchStore.insights

    );

    /**
     * Report 1
     */

    await renderLaunchAgeAnalysis(

        document.getElementById(

            "newLaunchAgeAnalysis"

        ),

        NewLaunchStore.launchAgeAnalysis

    );

    /**
     * Report 2
     */

    await renderWeeklyLaunch(

        document.getElementById(

            "newLaunchWeekly"

        ),

        NewLaunchStore.weeklyPerformance

    );

    /**
     * Report 3
     */

    await renderLaunchPerformance(

        document.getElementById(

            "newLaunchPerformance"

        ),

        NewLaunchStore.launchPerformance

    );

    /**
     * Report 4
     */

    await renderDeadLaunch(

        document.getElementById(

            "newLaunchDead"

        ),

        NewLaunchStore.deadLaunches

    );

}