/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Finalize Rows
 * Version : V1.0
 * =====================================================
 */

import { enrichMovement }
from "../enrichers/enrichMovement.js";

import { enrichRatings }
from "../enrichers/enrichRatings.js";

import { enrichStateCoverage }
from "../enrichers/enrichStateCoverage.js";

import { calculateCumulativeDW }
from "../calculations/calculateCumulativeDW.js";

import { calculateBadges }
from "../calculations/calculateBadges.js";

export function finalizeRows(

    rows,

    previousRows

){

    rows=

        enrichMovement(

            rows,

            previousRows

        );

    rows=

        enrichRatings(

            rows

        );

    rows=

        enrichStateCoverage(

            rows

        );

    rows=

        calculateCumulativeDW(

            rows

        );

    rows.forEach(

        row=>{

            row.badges=

                calculateBadges(

                    row

                );

        }

    );

    return rows;

}