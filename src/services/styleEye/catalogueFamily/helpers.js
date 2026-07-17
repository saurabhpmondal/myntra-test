/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Catalogue Family Helpers
 * Version : V2.0
 * =====================================================
 */

/**
 * =====================================================
 * ERP SKU
 *
 * 1281S2013 -> 1281S
 * 1415S147  -> 1415S
 * 1620S141  -> 1620S
 *
 * Catalogue = everything before the
 * last numeric product code.
 * =====================================================
 */

export function getCatalogueId(erpSku){

    erpSku = String(erpSku || "")
        .trim()
        .toUpperCase();

    if(!erpSku){

        return "";

    }

    const lastLetter = erpSku.search(/[A-Z](?=\d+$)/);

    if(lastLetter === -1){

        return erpSku;

    }

    return erpSku.substring(

        0,

        lastLetter + 1

    );

}

/**
 * =====================================================
 * Normalize
 * =====================================================
 */

export function normalize(value){

    return String(value || "")
        .trim()
        .toUpperCase();

}

/**
 * =====================================================
 * Compare Style
 * =====================================================
 */

export function compareStyleId(a,b){

    return String(a).localeCompare(

        String(b),

        undefined,

        {

            numeric:true,

            sensitivity:"base"

        }

    );

}

/**
 * =====================================================
 * Sort By Sale
 * =====================================================
 */

export function sortBySale(a,b){

    return (b.sale90D||0)-(a.sale90D||0);

}