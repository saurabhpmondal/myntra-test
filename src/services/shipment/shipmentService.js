/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Shipment Service
 * Version : V5.3
 * =====================================================
 */

import { DataStore } from "../dataService.js";

import { filterByDays } from "../dateFilterService.js";

import { buildShipmentData } from "./shipmentBuilder.js";

import { calculateShipmentData } from "./shipmentCalculation.js";

import { applyShipmentRules } from "./shipmentRules.js";

import { validateShipmentData } from "./shipmentValidator.js";

let shipmentData = [];

let shipmentConfig = null;

/**
 * =====================================================
 * Generate Shipment
 * =====================================================
 */

export function generateShipment(config){

    console.time("Shipment Generation");

    // ==========================================
    // Validate Data
    // ==========================================

    const validation = validateShipmentData();

    if(!validation.valid){

        console.error("Shipment Validation Failed");

        console.table(validation.errors);

        alert(validation.errors.join("\n"));

        console.timeEnd("Shipment Generation");

        return [];

    }

    // ==========================================
    // Config
    // ==========================================

    shipmentConfig = {

        saleDays:Number(config.saleDays),

        targetCover:Number(config.targetCover),

        recallTrigger:Number(config.recallTrigger)

    };

    console.group("Shipment Config");

    console.table(shipmentConfig);

    console.groupEnd();

    // ==========================================
    // Filter Sales
    // ==========================================

    const sales = filterByDays(

        DataStore.sales,

        shipmentConfig.saleDays

    );

    // ==========================================
    // Filter Returns
    // ==========================================

    const returns = filterByDays(

        DataStore.returns,

        shipmentConfig.saleDays

    );

    console.group("Filtered Records");

    console.table({

        Sales:sales.length,

        Returns:returns.length

    });

    console.groupEnd();

    // ==========================================
    // Build Shipment Data
    // ==========================================

    const rawData = buildShipmentData(

        sales,

        returns

    );

    console.log(

        `Builder Completed : ${rawData.length} Styles`

    );

    // ==========================================
    // Calculate Metrics
    // ==========================================

    const calculated = calculateShipmentData(

        rawData,

        shipmentConfig

    );

    console.log(

        "Calculation Engine Completed"

    );

    // ==========================================
    // Apply Rules
    // ==========================================

    shipmentData = applyShipmentRules(

        calculated,

        shipmentConfig

    );

shipmentData = shipmentData.filter(row =>

    Number(row.gross || 0) > 0 ||

    Number(row.shipment || 0) > 0 ||

    Number(row.recall || 0) > 0

);

    // ==========================================
    // Sort by Gross Sale
    // ==========================================

    shipmentData.sort((a,b)=>{

        const grossA = Number(a.gross || 0);

        const grossB = Number(b.gross || 0);

        if(grossA !== grossB){

            return grossB - grossA;

        }

        return String(a.styleId || "")

            .localeCompare(

                String(b.styleId || "")

            );

    });

    // ==========================================
    // Summary
    // ==========================================

    const shipmentCount = shipmentData.filter(

        row=>row.shipment>0

    ).length;

    const recallCount = shipmentData.filter(

        row=>row.recall>0

    ).length;

    const noShipmentCount = shipmentData.filter(

        row=>row.shipment===0

    ).length;

    console.group("Shipment Summary");

    console.table({

        Styles:shipmentData.length,

        Shipment:shipmentCount,

        Recall:recallCount,

        NoShipment:noShipmentCount

    });

    console.groupEnd();

    console.timeEnd("Shipment Generation");

    return shipmentData;

}

/**
 * =====================================================
 * Shipment Data
 * =====================================================
 */

export function getShipmentData(){

    return shipmentData;

}

/**
 * =====================================================
 * Shipment Config
 * =====================================================
 */

export function getShipmentConfig(){

    return shipmentConfig;

}

/**
 * =====================================================
 * Clear Shipment
 * =====================================================
 */

export function clearShipmentData(){

    shipmentData=[];

    shipmentConfig=null;

}

