/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : CSV Service
 * Version : V4.0
 * =====================================================
 */

export async function loadCSV(url){

    try{

        const response = await fetch(url);

        if(!response.ok){

            throw new Error(`Unable to fetch CSV : ${url}`);

        }

        const text = await response.text();

        return parseCSV(text);

    }

    catch(error){

        console.error("CSV Load Error:", error);

        return [];

    }

}

/**
 * =====================================================
 * Parse CSV
 * =====================================================
 */

function parseCSV(csv){

    if(!csv){

        return [];

    }

    /* ==========================================
       Normalize File
    ========================================== */

    csv = csv

        .replace(/^\uFEFF/, "")      // Remove UTF-8 BOM

        .replace(/\r\n/g,"\n")

        .replace(/\r/g,"\n");

    const lines = csv.split("\n")

        .filter(line=>line.trim());

    if(!lines.length){

        return [];

    }

    /* ==========================================
       Headers
    ========================================== */

    const headers = splitCSVLine(lines[0]).map(cleanHeader);

    const data = [];

    for(let i=1;i<lines.length;i++){

        const values = splitCSVLine(lines[i]);

        const row = {};

        headers.forEach((header,index)=>{

            row[header] =

                values[index]

                ?

                values[index].trim()

                :

                "";

        });

        data.push(row);

    }

    return data;

}

/**
 * =====================================================
 * Clean Header
 * =====================================================
 */

function cleanHeader(header){

    return String(header || "")

        .replace(/^\uFEFF/, "")

        .replace(/\u200B/g,"")

        .replace(/\u00A0/g," ")

        .trim();

}

/**
 * =====================================================
 * Split CSV Line
 * =====================================================
 */

function splitCSVLine(line){

    const result=[];

    let current="";

    let insideQuotes=false;

    for(let i=0;i<line.length;i++){

        const char=line[i];

        if(char==='"'){

            if(

                insideQuotes &&

                line[i+1]==='"'

            ){

                current+='"';

                i++;

                continue;

            }

            insideQuotes=!insideQuotes;

            continue;

        }

        if(char==="," && !insideQuotes){

            result.push(current);

            current="";

            continue;

        }

        current+=char;

    }

    result.push(current);

    return result;

}