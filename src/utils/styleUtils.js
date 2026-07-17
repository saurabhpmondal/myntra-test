/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Style Utility
 * Version : V1.0
 * =====================================================
 */

/**
 * ==========================================
 * Clean Style ID
 * ==========================================
 */

export function normalizeStyleId(styleId){

    return String(styleId || "")
        .trim()
        .toUpperCase();

}

/**
 * ==========================================
 * Get Catalogue ID
 *
 * Example:
 * 106RS413 → 106RS
 * ==========================================
 */

export function getCatalogueId(styleId){

    styleId = normalizeStyleId(styleId);

    if(styleId.length <= 3){

        return styleId;

    }

    return styleId.slice(0,-3);

}

/**
 * ==========================================
 * Get Product Code
 *
 * Example:
 * 106RS413 → 413
 * ==========================================
 */

export function getProductCode(styleId){

    styleId = normalizeStyleId(styleId);

    if(styleId.length <= 3){

        return "";

    }

    return styleId.slice(-3);

}

/**
 * ==========================================
 * Same Catalogue?
 * ==========================================
 */

export function isSameCatalogue(

    styleA,

    styleB

){

    return (

        getCatalogueId(styleA)===

        getCatalogueId(styleB)

    );

}

/**
 * ==========================================
 * Compare Product Code
 * Used for sorting family members
 * ==========================================
 */

export function compareStyleId(

    styleA,

    styleB

){

    return Number(

        getProductCode(styleA)

    ) -

    Number(

        getProductCode(styleB)

    );

}