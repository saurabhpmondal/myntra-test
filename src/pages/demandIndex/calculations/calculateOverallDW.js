/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Overall Demand Weight
 * Version : V1.0
 * =====================================================
 */

/**
 * =====================================================
 * Calculate Overall DW
 *
 * Formula:
 *
 * Style Sales
 * -----------
 * Total Sales
 *
 * Returns decimal value.
 * =====================================================
 */

export function calculateOverallDW(

    styleSales,

    totalSales

){

    const sales =

        Number(styleSales || 0);

    const total =

        Number(totalSales || 0);

    if(

        total <= 0

    ){

        return 0;

    }

    return sales / total;

}

/**
 * =====================================================
 * Format Overall DW
 * =====================================================
 */

export function formatOverallDW(

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