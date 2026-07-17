/**
 * =====================================================
 * Project Phoenix
 * File : sidebar.js
 * Version : 0.1.0
 * Purpose : Sidebar Renderer
 * =====================================================
 */

export function renderSidebar() {

    const sidebar = document.getElementById("sidebar");

    sidebar.innerHTML = `

        <div class="phoenix-logo">

            MYNTRA ANALYTICS

        </div>

        <nav id="sidebar-menu"></nav>

    `;

}
