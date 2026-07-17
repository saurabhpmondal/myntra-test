/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Weekly Launch Performance
 * Version : V2.0
 * =====================================================
 */

/**
 * =====================================================
 * Build Weekly Launch Report
 * =====================================================
 */

export function buildWeeklyLaunch(

    launchRows=[]

){

    const weekMap={};

    /**
     * ==========================================
     * Group Data
     * ==========================================
     */

    launchRows.forEach(

        row=>{

            const week=

                getLaunchWeek(

                    row.launchAge

                );

            if(

                !weekMap[week]

            ){

                weekMap[week]={

                    launchWeek:week,

                    ageRange:getAgeRange(

                        week

                    ),

                    launches:0,

                    soldStyles:0,

                    deadLaunches:0,

                    unitsSold:0,

                    revenue:0

                };

            }

            const bucket=

                weekMap[week];

            bucket.launches++;

            if(

                row.units>0

            ){

                bucket.soldStyles++;

            }

            else{

                bucket.deadLaunches++;

            }

            bucket.unitsSold+=

                Number(

                    row.units||0

                );

            bucket.revenue+=

                Number(

                    row.revenue||0

                );

        }

    );

    /**
     * ==========================================
     * Create Continuous Weeks
     * ==========================================
     */

    const maxWeek=

        Math.max(

            1,

            ...Object.keys(

                weekMap

            ).map(Number)

        );

    const report=[];

    for(

        let week=1;

        week<=maxWeek;

        week++

    ){

        if(

            !weekMap[week]

        ){

            weekMap[week]={

                launchWeek:week,

                ageRange:getAgeRange(

                    week

                ),

                launches:0,

                soldStyles:0,

                deadLaunches:0,

                unitsSold:0,

                revenue:0

            };

        }

        report.push({

            ...weekMap[week],

            successRate:

                weekMap[week].launches

                ?

                (

                    weekMap[week].soldStyles/

                    weekMap[week].launches

                )*100

                :

                0

        });

    }

    return report;

}

/**
 * =====================================================
 * Launch Week
 * =====================================================
 */

function getLaunchWeek(

    launchAge

){

    return Math.floor(

        launchAge/7

    )+1;

}

/**
 * =====================================================
 * Age Range
 * =====================================================
 */

function getAgeRange(

    week

){

    const start=

        (

            week-1

        )*7;

    const end=

        start+6;

    return `${start}-${end} Days`;

}