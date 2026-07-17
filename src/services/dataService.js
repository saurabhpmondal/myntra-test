/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Data Service
 * Version : V3.5
 * =====================================================
 */

import { updateSplash } from "../splash/splash.js";
import { Sheets } from "./sheetConfig.js";
import { loadCSV } from "./csvService.js";
import { buildLookups } from "./lookupService.js";

export const DataStore = {

    sales: [],
    returns: [],
    sjitStock: [],
    sorStock: [],
    sellerStock: [],
    productMaster: [],
    traffic: [],

    listings: [],
    inventory: [],
    ads: [],

    /* ==========================================
       NEW
    ========================================== */

    imageLinks: [],
    listingMaster: [],

    loaded:false

};

let completed = 0;
let totalJobs = 0;

/**
 * =====================================================
 * Load One Sheet
 * =====================================================
 */

async function loadSheet(job){

    console.time(job.title);

    try{

        const data = await loadCSV(job.url);

        console.timeEnd(job.title);

        completed++;

        const progress = Math.round(

            5 + (completed/totalJobs)*90

        );

        updateSplash(

            progress,

            `${completed}/${totalJobs} Loaded • ${job.title}`

        );

        console.log(

            `✅ ${job.title}: ${data.length}`

        );

        return data;

    }

    catch(error){

        console.error(

            `❌ ${job.title}`,

            error

        );

        completed++;

        const progress = Math.round(

            5 + (completed/totalJobs)*90

        );

        updateSplash(

            progress,

            `${completed}/${totalJobs} Loaded • ${job.title} (Failed)`

        );

        return [];

    }

}

/**
 * =====================================================
 * Initialize
 * =====================================================
 */

export async function initializeData(){

    if(DataStore.loaded){

        return DataStore;

    }

    console.log(

        "🚀 Loading Phoenix Data Engine..."

    );

    updateSplash(

        5,

        "Connecting to Google Sheets..."

    );

    const jobs=[

        {

            key:"sales",

            title:"Sales",

            url:Sheets.sales

        },

        {

            key:"returns",

            title:"Returns",

            url:Sheets.returns

        },

        {

            key:"sjitStock",

            title:"SJIT Stock",

            url:Sheets.sjitStock

        },

        {

            key:"sorStock",

            title:"SOR Stock",

            url:Sheets.sorStock

        },

        {

            key:"sellerStock",

            title:"Seller Stock",

            url:Sheets.sellerStock

        },

        {

            key:"productMaster",

            title:"Product Master",

            url:Sheets.productMaster

        },

        {

            key:"traffic",

            title:"Traffic",

            url:Sheets.traffic

        },

        {

            key:"listings",

            title:"Listings",

            url:Sheets.listings

        },

        {

            key:"inventory",

            title:"Inventory",

            url:Sheets.inventory

        },

        {

            key:"ads",

            title:"Ads",

            url:Sheets.ads

        },

        /* ==========================================
           NEW
        ========================================== */

        {

            key:"imageLinks",

            title:"Image Links",

            url:Sheets.imageLinks

        },

        {

            key:"listingMaster",

            title:"Listing Master",

            url:Sheets.listingMaster

        }

    ];

    totalJobs = jobs.length;

    completed = 0;

    updateSplash(

        8,

        `Starting ${totalJobs} Downloads...`

    );

    const promises =

        jobs.map(job=>loadSheet(job));

    const results =

        await Promise.allSettled(

            promises

        );

    results.forEach(

        (result,index)=>{

            const key = jobs[index].key;

            if(result.status==="fulfilled"){

                DataStore[key]=

                    result.value;

            }

            else{

                console.error(

                    `❌ Failed : ${jobs[index].title}`,

                    result.reason

                );

                DataStore[key]=[];

            }

        }

    );

    updateSplash(

        96,

        "Building Lookups..."

    );

    buildLookups();

    DataStore.loaded=true;

    console.table({

        Sales:DataStore.sales.length,

        Returns:DataStore.returns.length,

        SJIT:DataStore.sjitStock.length,

        SOR:DataStore.sorStock.length,

        SellerStock:DataStore.sellerStock.length,

        ProductMaster:DataStore.productMaster.length,

        Traffic:DataStore.traffic.length,

        Listings:DataStore.listings.length,

        Inventory:DataStore.inventory.length,

        Ads:DataStore.ads.length,

        ImageLinks:DataStore.imageLinks.length,

        ListingMaster:DataStore.listingMaster.length

    });

    updateSplash(

        100,

        "Launching Phoenix..."

    );

    console.log(

        "✅ Phoenix Ready"

    );

    return DataStore;

}