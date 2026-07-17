/**
 * =====================================================
 * Project Phoenix
 * Product : Common Utility
 * Module  : Excel Export
 * Version : V1.0
 * =====================================================
 */

export function exportExcel({

    filename = "Report",

    columns = [],

    rows = []

}){

    if(typeof XLSX==="undefined"){

        alert("XLSX library not loaded.");

        return;

    }

    const data=[];

    data.push(

        columns.map(col=>col.label)

    );

    rows.forEach(row=>{

        const record=[];

        columns.forEach(col=>{

            let value=row[col.key];

            if(value===undefined || value===null){

                value="";

            }

            if(typeof value==="string"){

                value=value

                    .replace(/<[^>]+>/g,"")

                    .replace("🟢 NEW","NEW")

                    .trim();

            }

            record.push(value);

        });

        data.push(record);

    });

    const workbook=XLSX.utils.book_new();

    const worksheet=

        XLSX.utils.aoa_to_sheet(data);

    const widths=columns.map(col=>({

        wch:Math.max(

            18,

            String(col.label).length+4

        )

    }));

    worksheet["!cols"]=widths;

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Report"

    );

    const now=new Date();

    const stamp=

        now.getFullYear()+"-"+

        String(now.getMonth()+1).padStart(2,"0")+"-"+

        String(now.getDate()).padStart(2,"0");

    XLSX.writeFile(

        workbook,

        `${filename}_${stamp}.xlsx`

    );

}