/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Growth Render Engine
 * Version : V1.0
 * =====================================================
 */

const MYNTRA_URL =
    "https://www.myntra.com/";

export function buildGrowthCellData(row){

    const previous = Number(row.previous || 0);
    const current = Number(row.current || 0);

    // ==========================================
    // NEW TAG
    // ==========================================

    if(previous===0 && current>0){

        row.growthDisplay = "🟢 NEW";

        row.__growthClass = "badge-new";

    }else{

        row.growthDisplay = `${Number(row.growth||0).toFixed(2)}%`;

    }

    // ==========================================
    // STYLE LINK
    // ==========================================

    row.styleDisplay =

        `<a
            class="phoenix-style-link"
            href="${MYNTRA_URL}${row.styleId}"
            target="_blank"
        >
            ${row.styleId}
        </a>`;

    return row;

}

export function growthRenderer(column,row){

    switch(column.key){

        case "styleId":

            return row.styleDisplay;

        case "growth":

            return row.growthDisplay;

        case "rating":

            return Number(

                row.rating || 0

            ).toFixed(1);

        case "drr":

            return Number(

                row.drr || 0

            ).toFixed(2);

        default:

            return row[column.key];

    }

}

export function growthCellClass(column,row){

    if(column.key==="growth"){

        return row.__growthClass || "";

    }

    if(column.key==="projection"){

        return row.__projectionClass || "";

    }

    if(column.key.startsWith("day_")){

        return row[`__${column.key}`] || "";

    }

    return "";

}