/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Generic Ranking Engine
 * Version : V1.0
 * =====================================================
 */

/**
 * =====================================================
 * Rank By Metric
 *
 * Parameters
 *
 * rows
 * metricField
 * rankField
 *
 * Example
 *
 * rankByMetric(
 *      rows,
 *      "overallDW",
 *      "overallRank"
 * );
 * =====================================================
 */

export function rankByMetric(

    rows,

    metricField,

    rankField

){

    if(

        !Array.isArray(rows)

    ){

        return [];

    }

    const ranked =

        [...rows]

        .sort(

            (a,b)=>

                Number(

                    b[metricField] || 0

                )

                -

                Number(

                    a[metricField] || 0

                )

        );

    let previousValue =

        null;

    let currentRank =

        0;

    ranked.forEach(

        (

            row,

            index

        )=>{

            const value =

                Number(

                    row[metricField] || 0

                );

            if(

                value !== previousValue

            ){

                currentRank =

                    index + 1;

                previousValue =

                    value;

            }

            row[rankField] =

                currentRank;

        }

    );

    return ranked;

}