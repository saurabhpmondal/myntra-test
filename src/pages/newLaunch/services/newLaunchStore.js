/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : New Launch Store
 * Version : V2.0
 * =====================================================
 */

export const NewLaunchStore={

    /**
     * ==========================================
     * Raw Data
     * ==========================================
     */

    rawMaster:[],

    rawSales:[],

    /**
     * ==========================================
     * Complete Launch Dataset
     * (Never Filtered)
     * ==========================================
     */

    launchRowsAll:[],

    /**
     * ==========================================
     * Launch Window Dataset
     * (30 / 45 / 60 / 90)
     * ==========================================
     */

    launchRows:[],

    /**
     * ==========================================
     * Final Filtered Dataset
     * (Brand / Status / Search)
     * ==========================================
     */

    filteredRows:[],

    /**
     * ==========================================
     * Dashboard
     * ==========================================
     */

    kpis:{},

    insights:[],

    /**
     * ==========================================
     * Reports
     * ==========================================
     */

    launchPerformance:[],

    launchAgeAnalysis:[],

    weeklyPerformance:[],

    deadLaunches:[],

    /**
     * ==========================================
     * Filters
     * ==========================================
     */

    filters:{

        launchWindow:30,

        brand:"",

        status:"",

        search:""

    },

    /**
     * ==========================================
     * Status
     * ==========================================
     */

    loaded:false,

    generatedOn:null

};

/**
 * =====================================================
 * Reset Store
 * =====================================================
 */

export function resetNewLaunchStore(){

    NewLaunchStore.rawMaster=[];

    NewLaunchStore.rawSales=[];

    NewLaunchStore.launchRowsAll=[];

    NewLaunchStore.launchRows=[];

    NewLaunchStore.filteredRows=[];

    NewLaunchStore.kpis={};

    NewLaunchStore.insights=[];

    NewLaunchStore.launchPerformance=[];

    NewLaunchStore.launchAgeAnalysis=[];

    NewLaunchStore.weeklyPerformance=[];

    NewLaunchStore.deadLaunches=[];

    NewLaunchStore.filters={

        launchWindow:30,

        brand:"",

        status:"",

        search:""

    };

    NewLaunchStore.loaded=false;

    NewLaunchStore.generatedOn=null;

}