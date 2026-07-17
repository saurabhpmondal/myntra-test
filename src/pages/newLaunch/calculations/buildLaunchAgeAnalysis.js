/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Launch Age Analysis
 * Version : V3.0
 * =====================================================
 */

import {

    NewLaunchStore

}

from "../services/newLaunchStore.js";

const AGE_BUCKETS=[

    {

        label:"0-15",

        min:0,

        max:15

    },

    {

        label:"16-30",

        min:16,

        max:30

    },

    {

        label:"31-45",

        min:31,

        max:45

    },

    {

        label:"46-60",

        min:46,

        max:60

    },

    {

        label:"61-90",

        min:61,

        max:90

    },

    {

        label:"91-120",

        min:91,

        max:120

    },

    {

        label:"121-180",

        min:121,

        max:180

    },

    {

        label:">180",

        min:181,

        max:Number.MAX_SAFE_INTEGER

    }

];

/**
 * =====================================================
 * Build Launch Age Analysis
 * =====================================================
 */

export function buildLaunchAgeAnalysis(){

    /**
     * Always use complete launch history.
     * This report is NOT dependent on
     * Launch Window, Brand, Status or Search.
     */

    const rows=

        NewLaunchStore.launchRowsAll||[];

    return AGE_BUCKETS.map(

        bucket=>{

            const bucketRows=

                rows.filter(

                    row=>

                        row.launchAge>=bucket.min

                        &&

                        row.launchAge<=bucket.max

                );

            const launches=

                bucketRows.length;

            const soldStyles=

                bucketRows.filter(

                    row=>

                        Number(

                            row.units||0

                        )>0

                ).length;

            const deadLaunches=

                launches-

                soldStyles;

            const unitsSold=

                bucketRows.reduce(

                    (

                        total,

                        row

                    )=>

                        total+

                        Number(

                            row.units||0

                        ),

                    0

                );

            const revenue=

                bucketRows.reduce(

                    (

                        total,

                        row

                    )=>

                        total+

                        Number(

                            row.revenue||0

                        ),

                    0

                );

            const successRate=

                launches===0

                ?

                0

                :

                (

                    soldStyles/

                    launches

                )*100;

            return{

                bucket:

                    bucket.label,

                launches,

                soldStyles,

                deadLaunches,

                unitsSold,

                revenue,

                successRate

            };

        }

    );

}