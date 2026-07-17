/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Ads Dashboard
 * Version : V1.1
 * =====================================================
 */

import { createComponent } from "../../utils/createComponent.js";

import { generateAdsReport } from "../../services/ads/adsService.js";

import { renderTable } from "../common/table/table.js";

import { renderAdsKpis } from "./renderAdsKpis.js";

import { renderAdsChart } from "./renderAdsChart.js";

export async function renderAds(target){

    await createComponent({

        target,

        html:"src/components/ads/ads.html",

        css:"src/components/ads/ads.css"

    });

    await loadAds(target);

}

async function loadAds(target){

    const report = generateAdsReport();

    await renderAdsKpis(

        target.querySelector(

            "#ads-kpis"

        ),

        report.kpis

    );

    renderAdsChart(

        target.querySelector(

            "#ads-chart"

        ),

        report.chart

    );

    await renderAdsReports(

        target,

        report.reports

    );

}

async function renderAdsReports(

    target,

    reports

){

    await renderTable({

        target:

            target.querySelector(

                "#ads-daily-report"

            ),

        title:

            reports.daily.title,

        columns:

            reports.daily.columns,

        rows:

            reports.daily.rows

    });

    await renderTable({

        target:

            target.querySelector(

                "#ads-campaign-report"

            ),

        title:

            reports.campaign.title,

        columns:

            reports.campaign.columns,

        rows:

            reports.campaign.rows

    });

    await renderTable({

        target:

            target.querySelector(

                "#ads-adgroup-report"

            ),

        title:

            reports.adgroup.title,

        columns:

            reports.adgroup.columns,

        rows:

            reports.adgroup.rows

    });

}