/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Quality Intelligence Service
 * Version : V1.0
 * =====================================================
 */

import { DataStore } from "../dataService.js";
import { QualityRules } from "../../config/qualityRules.js";

export function buildQuality(context){

    if(!context){

        return null;

    }

    const styleId = context.identity.styleId;

    // ==========================================
    // Rating
    // ==========================================

    const traffic = DataStore.traffic.find(row=>

        String(row.style_id || "").trim()===styleId

    ) || {};

    const rating = Number(

        traffic.rating || 0

    );

    // ==========================================
    // Gross Sale
    // ==========================================

    const grossSaleUnits = DataStore.sales
        .filter(row=>

            String(row.style_id || "").trim()===styleId

        )
        .reduce(

            (sum,row)=>

                sum +

                Number(row.qty || 0),

            0

        );

    // ==========================================
    // Returns
    // ==========================================

    const returns = DataStore.returns.filter(row=>

        String(row.style_id || "").trim()===styleId

    );

    const customerReturns = returns.filter(row=>

        String(row.type || "")
            .trim()
            .toUpperCase()==="RETURN"

    );

    const courierReturns = returns.filter(row=>

        String(row.type || "")
            .trim()
            .toUpperCase()==="RTO"

    );

    const customerReturnUnits =

        customerReturns.length;

    const courierReturnUnits =

        courierReturns.length;

    const customerReturnPercent =

        grossSaleUnits===0

        ?0

        :(customerReturnUnits/grossSaleUnits)*100;

    const rtoPercent =

        grossSaleUnits===0

        ?0

        :(courierReturnUnits/grossSaleUnits)*100;

    // ==========================================
    // Return Reasons
    // ==========================================

    const reasonMap = {};

    customerReturns.forEach(row=>{

        const reason =

            String(

                row.return_reason ||

                "Others"

            ).trim();

        reasonMap[reason] =

            (reasonMap[reason] || 0) + 1;

    });

    const reasons = Object.entries(reasonMap)

        .map(([reason,count])=>({

            reason,

            count,

            percent:

                customerReturnUnits===0

                ?0

                :(count/customerReturnUnits)*100

        }))

        .sort(

            (a,b)=>b.count-a.count

        );

    // ==========================================
    // Risk Indicators
    // ==========================================

    const risks = [];

    risks.push({

        label:"Rating",

        status:

            rating>=QualityRules.rating.good

            ?"GOOD"

            :"BAD"

    });

    risks.push({

        label:"Customer Return",

        status:

            customerReturnPercent<=QualityRules.customerReturn.good

            ?"GOOD"

            :"BAD"

    });

    risks.push({

        label:"Courier RTO",

        status:

            rtoPercent<=QualityRules.rto.good

            ?"GOOD"

            :"BAD"

    });

    reasons.forEach(item=>{

        const reasonUpper =

            item.reason.toUpperCase();

        if(

            QualityRules.highRiskKeywords.some(

                keyword=>

                    reasonUpper.includes(keyword)

            )

        ){

            risks.push({

                label:item.reason,

                status:"HIGH"

            });

        }

    });

    // ==========================================
    // Health
    // ==========================================

    let health = {

        status:"Excellent",

        color:"success",

        icon:"🟢",

        description:

            "Customer experience is healthy."

    };

    if(

        rating<QualityRules.rating.warning ||

        customerReturnPercent>

        QualityRules.customerReturn.warning

    ){

        health={

            status:"Critical",

            color:"danger",

            icon:"🔴",

            description:

                "Immediate investigation recommended."

        };

    }

    else if(

        rating<QualityRules.rating.good ||

        customerReturnPercent>

        QualityRules.customerReturn.good

    ){

        health={

            status:"Needs Attention",

            color:"warning",

            icon:"🟠",

            description:

                "Quality indicators require monitoring."

        };

    }

    // ==========================================
    // Executive Summary
    // ==========================================

    const summary = [];

    summary.push(

        rating>=QualityRules.rating.good

        ?

        "Customer rating is healthy."

        :

        "Customer rating needs improvement."

    );

    summary.push(

        customerReturnPercent<=QualityRules.customerReturn.good

        ?

        "Customer return rate is under control."

        :

        "Customer return rate is higher than expected."

    );

    if(reasons.length){

        summary.push(

            `Top return reason is "${reasons[0].reason}".`

        );

    }

    // ==========================================
    // Business Action
    // ==========================================

    let action={

        type:"CONTINUE",

        title:"Continue Scaling",

        icon:"✅",

        priority:"LOW",

        description:

            "No immediate quality concern detected."

    };

    if(reasons.length){

        const topReason =

            reasons[0].reason.toUpperCase();

        if(topReason.includes("FABRIC")){

            action={

                type:"FABRIC",

                title:"Review Fabric Quality",

                icon:"🧵",

                priority:"CRITICAL",

                description:

                    "Fabric complaints are the highest contributor to customer returns."

            };

        }

        else if(

            topReason.includes("COLOR") ||

            topReason.includes("COLOUR")

        ){

            action={

                type:"COLOR",

                title:"Review Product Images",

                icon:"🎨",

                priority:"HIGH",

                description:

                    "Customers report color mismatch."

            };

        }

        else if(topReason.includes("SIZE")){

            action={

                type:"SIZE",

                title:"Improve Size Guidance",

                icon:"📏",

                priority:"MEDIUM",

                description:

                    "Most returns are due to sizing issues."

            };

        }

    }

    return{

        snapshot:{

            rating,

            grossSaleUnits,

            customerReturnUnits,

            customerReturnPercent,

            courierReturnUnits,

            rtoPercent

        },

        analysis:{

            reasons,

            risks

        },

        health,

        summary,

        action

    };

}