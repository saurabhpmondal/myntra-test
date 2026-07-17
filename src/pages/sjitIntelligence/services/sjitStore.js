/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : SJIT Intelligence Store
 * Version : V1.0
 * =====================================================
 */

export const SJITStore = {

    /**
     * ==========================================
     * Base Data
     * ==========================================
     */

    rawSales:[],

    rawStock:[],

    warehouseRows:[],

    /**
     * ==========================================
     * KPI
     * ==========================================
     */

    kpis:{

        totalStock:0,

        totalSale:0,

        sellThrough:0,

        topFC:null,

        topState:null

    },

    /**
     * ==========================================
     * Insights
     * ==========================================
     */

    insights:[],

    /**
     * ==========================================
     * Reports
     * ==========================================
     */

    fcReport:[],

    stateReport:[],

    regionReport:[],

    /**
     * ==========================================
     * Charts
     * ==========================================
     */

    mapData:[],

    stockPie:[],

    /**
     * ==========================================
     * Utilities
     * ==========================================
     */

    loaded:false

};

/**
 * =====================================================
 * Reset Store
 * =====================================================
 */

export function resetSJITStore(){

    SJITStore.rawSales=[];

    SJITStore.rawStock=[];

    SJITStore.warehouseRows=[];

    SJITStore.kpis={

        totalStock:0,

        totalSale:0,

        sellThrough:0,

        topFC:null,

        topState:null

    };

    SJITStore.insights=[];

    SJITStore.fcReport=[];

    SJITStore.stateReport=[];

    SJITStore.regionReport=[];

    SJITStore.mapData=[];

    SJITStore.stockPie=[];

    SJITStore.loaded=false;

}