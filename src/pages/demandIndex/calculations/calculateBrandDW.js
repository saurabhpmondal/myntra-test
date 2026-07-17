/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Brand Demand Weight
 * Version : V1.0
 * =====================================================
 */

/**
 * =====================================================
 * Calculate Brand DW
 *
 * Formula:
 *
 * Style Sales
 * -----------
 * Brand Sales
 *
 * Returns decimal value.
 * =====================================================
 */

export function calculateBrandDW(

    styleSales,

    brandSales

){

    const sales =

        Number(styleSales || 0);

    const total =

        Number(brandSales || 0);

    if(

        total <= 0

    ){

        return 0;

    }

    return sales / total;

}

/**
 * =====================================================
 * Format Brand DW
 * =====================================================
 */

export function formatBrandDW(

    value,

    digits = 2

){

    return `${

        (

            Number(value || 0) * 100

        ).toFixed(

            digits

        )

    }%`;

}