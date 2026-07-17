/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SJIT Layout
 * Version : V2.2
 * =====================================================
 */

export async function renderLayout(

    target

){

    /**
     * ==========================================
     * Load CSS Once
     * ==========================================
     */

    if(

        !document.getElementById(

            "sjit-css"

        )

    ){

        const link=

            document.createElement(

                "link"

            );

        link.id="sjit-css";

        link.rel="stylesheet";

        link.href=

            "src/pages/sjitIntelligence/sjitIntelligence.css";

        document.head.appendChild(

            link

        );

    }

    target.innerHTML=`

<div class="sjit-page">

    <section class="dashboard-section">

        <div id="sjitHeader"></div>

    </section>

    <section class="dashboard-section">

        <div id="sjitKPIs"></div>

    </section>

    <section class="dashboard-section">

        <div id="sjitInsights"></div>

    </section>

    <section class="dashboard-section">

        <div class="chart-grid">

            <div id="sjitMap"></div>

            <div id="sjitPie"></div>

        </div>

    </section>

    <section class="dashboard-section">

        <div id="sjitFCReport"></div>

    </section>

    <section class="dashboard-section">

        <div class="report-grid">

            <div id="sjitStateReport"></div>

            <div id="sjitRegionReport"></div>

        </div>

    </section>

</div>

`;

}