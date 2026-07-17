/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Shipment Validator
 * Version : V1.0
 * =====================================================
 */

import { DataStore } from "../dataService.js";

export function validateShipmentData(){

    const errors = [];

    // ==========================================
    // Dataset Availability
    // ==========================================

    validateDataset(
        "Sales",
        DataStore.sales,
        errors
    );

    validateDataset(
        "Returns",
        DataStore.returns,
        errors
    );

    validateDataset(
        "SJIT Stock",
        DataStore.sjitStock,
        errors
    );

    validateDataset(
        "Product Master",
        DataStore.productMaster,
        errors
    );

    validateDataset(
        "Traffic",
        DataStore.traffic,
        errors
    );

    // ==========================================
    // Basic Data Quality
    // ==========================================

    if(DataStore.sales.length){

        const sample = DataStore.sales[0];

        if(sample.style_id===undefined){

            errors.push(
                "Sales : style_id column missing."
            );

        }

        if(sample.qty===undefined){

            errors.push(
                "Sales : qty column missing."
            );

        }

        if(sample.date===undefined){

            errors.push(
                "Sales : date column missing."
            );

        }

    }

    if(DataStore.sjitStock.length){

        const sample = DataStore.sjitStock[0];

        if(sample.sellable_inventory_count===undefined){

            errors.push(
                "SJIT : sellable_inventory_count missing."
            );

        }

    }

    if(DataStore.productMaster.length){

        const sample = DataStore.productMaster[0];

        if(sample.erp_sku===undefined){

            errors.push(
                "Master : erp_sku missing."
            );

        }

    }

    return{

        valid:

            errors.length===0,

        errors

    };

}

function validateDataset(

    name,

    dataset,

    errors

){

    if(

        !Array.isArray(dataset)

    ){

        errors.push(

            `${name} dataset not loaded.`

        );

        return;

    }

    if(

        dataset.length===0

    ){

        errors.push(

            `${name} dataset is empty.`

        );

    }

}