/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Navigation
 * Version : V3.1
 * =====================================================
 */

export const Navigation = [

    {
        id:"dashboard",
        title:"Dashboard",
        icon:"layout-dashboard",
        filter:true
    },

    {
        id:"daily-sales",
        title:"Daily Sales",
        icon:"calendar-days",
        filter:true
    },

    /**
     * ==========================================
     * NEW
     * ==========================================
     */

    {
        id:"sales-return",
        title:"Sales & Return",
        icon:"undo-2",
        filter:true
    },

    {
        id:"business",
        title:"Business Report",
        icon:"briefcase-business",
        filter:true
    },

    {
        id:"growth",
        title:"Growth Report",
        icon:"trending-up",
        filter:true
    },

    {
        id:"shipment",
        title:"SJIT Shipment",
        icon:"truck",
        filter:true
    },

    {
        id:"sor-shipment",
        title:"SOR Shipment",
        icon:"package-plus",
        filter:true
    },

    {
        id:"new-launch",
        title:"New Launch",
        icon:"rocket",
        filter:true
    },

    {
        id:"style-eye",
        title:"Style Eye",
        icon:"eye",
        filter:true
    },

    {
        id:"demand-index",
        title:"Demand Index",
        icon:"chart-column",
        filter:false
    },

    {
        id:"sjit-intelligence",
        title:"FBM Intelligence",
        icon:"map",
        filter:false
    },

    {
        id:"ads",
        title:"PLA Ads",
        icon:"megaphone",
        filter:false
    },

    /* ==========================================
       External Dashboards
    ========================================== */

    {
        id:"divider",
        divider:true,
        title:"Related Dashboards"
    },

    {
        id:"myntra-pricing",
        title:"Myntra Pricing",
        icon:"external-link",
        external:true,
        url:"https://saurabhpmondal.github.io/myntra-reverse-pricing/"
    },

    {
        id:"meesho-dashboard",
        title:"Meesho Dashboard",
        icon:"external-link",
        external:true,
        url:"https://saurabhpmondal.github.io/meesho/"
    },

    {
        id:"nykaa-dashboard",
        title:"Nykaa Dashboard",
        icon:"external-link",
        external:true,
        url:"https://saurabhpmondal.github.io/nykaa-fashion-pricing/"
    }

];