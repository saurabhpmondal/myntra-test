/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Previous Date Range
 * Version : V1.0
 * =====================================================
 */

export function getPreviousDateRange(

    fromDate,

    toDate

){

    const totalDays=

        Math.floor(

            (

                toDate-

                fromDate

            )

            /

            86400000

        )+1;

    const previousToDate=

        new Date(

            fromDate

        );

    previousToDate.setDate(

        previousToDate.getDate()-1

    );

    const previousFromDate=

        new Date(

            previousToDate

        );

    previousFromDate.setDate(

        previousFromDate.getDate()

        -

        (

            totalDays-1

        )

    );

    return{

        fromDate:

            previousFromDate,

        toDate:

            previousToDate

    };

}