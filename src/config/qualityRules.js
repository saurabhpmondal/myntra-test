/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Quality Rules
 * Version : V1.0
 * =====================================================
 */

export const QualityRules = {

    // ==========================================
    // Rating Rules
    // ==========================================

    rating:{

        excellent:4.2,

        good:3.8,

        warning:3.5

    },

    // ==========================================
    // Return %
    // ==========================================

    customerReturn:{

        good:35,

        warning:50

    },

    // ==========================================
    // Courier RTO %
    // ==========================================

    rto:{

        good:5,

        warning:10

    },

    // ==========================================
    // High Risk Keywords
    // ==========================================

    highRiskKeywords:[

        "FABRIC",

        "COLOR",

        "COLOUR",

        "QUALITY",

        "STITCH",

        "STITCHING",

        "DAMAGED",

        "DEFECT",

        "TORN"

    ],

    // ==========================================
    // Medium Risk Keywords
    // ==========================================

    mediumRiskKeywords:[

        "SIZE",

        "FIT",

        "LARGE",

        "SMALL",

        "TIGHT",

        "LOOSE"

    ]

};