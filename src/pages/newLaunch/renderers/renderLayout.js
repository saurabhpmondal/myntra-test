/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : New Launch Layout
 * Version : V1.1
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

            "new-launch-css"

        )

    ){

        const link=

            document.createElement(

                "link"

            );

        link.id=

            "new-launch-css";

        link.rel=

            "stylesheet";

        link.href=

            "src/pages/newLaunch/newLaunch.css";

        document.head.appendChild(

            link

        );

    }

    target.innerHTML=`

<div class="new-launch-page">

    <section class="dashboard-section">

        <div id="newLaunchHeader"></div>

    </section>

    <section class="dashboard-section">

        <div id="newLaunchKPIs"></div>

    </section>

    <section class="dashboard-section">

        <div id="newLaunchInsights"></div>

    </section>

    <!-- Report 1 -->

    <section class="dashboard-section">

        <div id="newLaunchAgeAnalysis"></div>

    </section>

    <!-- Report 2 -->

    <section class="dashboard-section">

        <div id="newLaunchWeekly"></div>

    </section>

    <!-- Report 3 -->

    <section class="dashboard-section">

        <div id="newLaunchPerformance"></div>

    </section>

    <!-- Report 4 -->

    <section class="dashboard-section">

        <div id="newLaunchDead"></div>

    </section>

</div>

`;

}