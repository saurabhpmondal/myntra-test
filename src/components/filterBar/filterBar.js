/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Executive Filter Bar
 * Version : V1.1
 * =====================================================
 */

import { createComponent } from "../../utils/createComponent.js";

import { LookupStore } from "../../services/lookupService.js";

import {
    FilterState,
    initializeFilters,
    updateFilters,
    resetFilters
} from "../../services/filterService.js";

import { DataStore } from "../../services/dataService.js";

import {
    getLatestPeriod,
    getPeriodKey,
    getPeriodLabel
} from "../../services/periodService.js";

import { refreshDashboard } from "../../pages/dashboard/dashboard.js";

export async function renderFilterBar(target){

    await createComponent({

        target,

        html:"src/components/filterBar/filterBar.html",

        css:"src/components/filterBar/filterBar.css"

    });

    initializeFilters();

    populatePeriods();

    populateSelect(
        "filter-brand",
        LookupStore.brands,
        "All"
    );

    populateSelect(
        "filter-category",
        LookupStore.categories,
        "All"
    );

    populateSelect(
        "filter-status",
        LookupStore.erpStatuses,
        "All"
    );

    attachEvents();

}

function populatePeriods(){

    const select = document.getElementById("filter-period");

    const periods = new Map();

    DataStore.sales.forEach(row=>{

        const key = getPeriodKey(
            row.month,
            row.year
        );

        periods.set(
            key,
            getPeriodLabel(
                row.month,
                row.year
            )
        );

    });

    [...periods.entries()]
        .sort((a,b)=>b[0]-a[0])
        .forEach(([key,label])=>{

            const option=document.createElement("option");

            option.value=key;

            option.textContent=label;

            select.appendChild(option);

        });

    const latest=getLatestPeriod(DataStore.sales);

    if(latest){

        select.value=latest.key;

    }

}

function populateSelect(id,list,first){

    const select=document.getElementById(id);

    select.innerHTML="";

    const all=document.createElement("option");

    all.value="All";

    all.textContent=first;

    select.appendChild(all);

    list.forEach(item=>{

        const option=document.createElement("option");

        option.value=item;

        option.textContent=item;

        select.appendChild(option);

    });

}

function attachEvents(){

    document
        .getElementById("applyFilters")
        .addEventListener("click",()=>{

            updateFilters({

                period:Number(document.getElementById("filter-period").value),

                brand:document.getElementById("filter-brand").value,

                category:document.getElementById("filter-category").value,

                erpStatus:document.getElementById("filter-status").value,

                search:document.getElementById("filter-search").value.trim()

            });

            refreshDashboard();

        });

    document
        .getElementById("resetFilters")
        .addEventListener("click",()=>{

            resetFilters();

            renderFilterBar(
                document.querySelector(".filter-container")
            );

            refreshDashboard();

        });

}