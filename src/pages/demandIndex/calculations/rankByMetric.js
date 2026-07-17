/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Generic Ranking Engine
 * Version : V2.0
 * =====================================================
 */

/**
 * =====================================================
 * Rank By Metric
 *
 * Sequential Ranking
 *
 * 1
 * 2
 * 3
 * 4
 * 5
 *
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

    const ranked=[

        ...rows

    ].sort(

        (a,b)=>{

            return(

                Number(

                    b[metricField]||0

                )

                -

                Number(

                    a[metricField]||0

                )

            );

        }

    );

    ranked.forEach(

        (

            row,

            index

        )=>{

            row[rankField]=

                index+1;

        }

    );

    return ranked;

}