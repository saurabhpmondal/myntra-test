/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Ads Date Service
 * Version : V1.1
 * =====================================================
 */

export function buildSystemDate(row){

    if(row.system_date){

        return String(

            row.system_date

        );

    }

    const year =

        String(

            row.year

        ).padStart(4,"0");

    const month =

        String(

            row.month

        ).padStart(2,"0");

    const day =

        String(

            row.day

        ).padStart(2,"0");

    return `${year}${month}${day}`;

}

export function formatDisplayDate(systemDate){

    const value =

        String(systemDate);

    return `${

        value.slice(6,8)

    }-${

        value.slice(4,6)

    }-${

        value.slice(0,4)

    }`;

}

export function compareAdsDate(a,b){

    return(

        Number(

            buildSystemDate(a)

        )

        -

        Number(

            buildSystemDate(b)

        )

    );

}

export function sortAdsByDate(rows){

    return[

        ...rows

    ].sort(compareAdsDate);

}