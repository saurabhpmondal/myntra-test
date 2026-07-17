/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : India Map Service
 * Version : V2.0
 * =====================================================
 */

let registered=false;

export async function registerIndiaMap(){

    if(registered){

        return;

    }

    const response=

        await fetch(

            "src/assets/maps/india.json"

        );

    if(!response.ok){

        throw new Error(

            "Unable to load india.json"

        );

    }

    const geoJson=

        await response.json();

    echarts.registerMap(

        "India",

        geoJson

    );

    registered=true;

}