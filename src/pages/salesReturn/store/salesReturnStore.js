/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Sales Return Store
 * Version : V12.0
 * =====================================================
 */

export const SalesReturnStore={

    /**
     * Status
     */

    loaded:false,

    loading:false,

    generatedOn:null,

    /**
     * Filtered Dataset
     */

    sales:[],

    returns:[],

    /**
     * Lookup
     */

    lookup:{},

    /**
     * KPI
     */

    dashboard:{

        sale:{
            units:0,
            gmv:0
        },

        cancel:{
            units:0,
            gmv:0
        },

        rto:{
            units:0,
            gmv:0
        },

        cx:{
            units:0,
            gmv:0
        },

        net:{
            units:0,
            gmv:0
        }

    },

    /**
     * Reports
     */

    reports:{

        poType:[],

        brand:[],

        style:[],

        returnReason:[],

        trend:[]

    },

    /**
     * UI
     */

    ui:{

        lastRefresh:null

    }

};

export function resetSalesReturnStore(){

    SalesReturnStore.loaded=false;

    SalesReturnStore.loading=false;

    SalesReturnStore.generatedOn=null;

    SalesReturnStore.sales=[];

    SalesReturnStore.returns=[];

    SalesReturnStore.lookup={};

    SalesReturnStore.dashboard={

        sale:{units:0,gmv:0},

        cancel:{units:0,gmv:0},

        rto:{units:0,gmv:0},

        cx:{units:0,gmv:0},

        net:{units:0,gmv:0}

    };

    SalesReturnStore.reports={

        poType:[],

        brand:[],

        style:[],

        returnReason:[],

        trend:[]

    };

    SalesReturnStore.ui.lastRefresh=null;

}