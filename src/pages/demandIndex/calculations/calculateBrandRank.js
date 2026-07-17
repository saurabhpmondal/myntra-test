/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Calculate Brand Rank
 * Version : V3.0
 * =====================================================
 */

/**
 * =====================================================
 * Brand Rank
 *
 * Business Logic
 *
 * Rank styles within each Brand
 * using Units Sold.
 *
 * Each Brand starts from Rank 1.
 * =====================================================
 */

export function calculateBrandRank(

    rows

){

    if(

        !Array.isArray(rows)

    ){

        return [];

    }

    const brands={};

    rows.forEach(

        row=>{

            const brand=

                row.brand || "";

            if(

                !brands[brand]

            ){

                brands[brand]=[];

            }

            brands[brand].push(

                row

            );

        }

    );

    Object.values(

        brands

    ).forEach(

        brandRows=>{

            brandRows.sort(

                (a,b)=>

                    Number(

                        b.unitsSold||0

                    )

                    -

                    Number(

                        a.unitsSold||0

                    )

            );

            brandRows.forEach(

                (

                    row,

                    index

                )=>{

                    row.brandRank=

                        index+1;

                }

            );

        }

    );

    return rows;

}

