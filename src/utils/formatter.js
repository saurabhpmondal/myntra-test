/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Formatter Utility
 * Version : V3.0
 * =====================================================
 */

/**
 * Format Currency (₹)
 */
export function formatCurrency(value) {

    value = Number(value || 0);

    return new Intl.NumberFormat("en-IN", {

        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0

    }).format(value);

}

/**
 * Format Compact Currency
 * Example:
 * 28500000 → ₹2.85 Cr
 */
export function formatCompactCurrency(value) {

    value = Number(value || 0);

    if (value >= 10000000) {

        return "₹" + (value / 10000000).toFixed(2) + " Cr";

    }

    if (value >= 100000) {

        return "₹" + (value / 100000).toFixed(2) + " L";

    }

    if (value >= 1000) {

        return "₹" + (value / 1000).toFixed(1) + " K";

    }

    return "₹" + value.toFixed(0);

}

/**
 * Format Numbers
 * Example:
 * 1234567 → 12,34,567
 */
export function formatNumber(value) {

    value = Number(value || 0);

    return new Intl.NumberFormat("en-IN").format(value);

}

/**
 * Format Compact Numbers
 * Example:
 * 12563 → 12.6K
 */
export function formatCompactNumber(value) {

    value = Number(value || 0);

    if (value >= 10000000) {

        return (value / 10000000).toFixed(2) + " Cr";

    }

    if (value >= 100000) {

        return (value / 100000).toFixed(2) + " L";

    }

    if (value >= 1000) {

        return (value / 1000).toFixed(1) + " K";

    }

    return value.toString();

}

/**
 * Percentage
 */
export function formatPercentage(value, digits = 1) {

    value = Number(value || 0);

    return value.toFixed(digits) + "%";

}