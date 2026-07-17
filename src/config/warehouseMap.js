/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Warehouse Configuration
 * Version : V1.0
 * =====================================================
 */

export const WarehouseMap = {

    21181:{

        id:21181,

        name:"Leemboodi Fashion_PPMP_EMOO",

        shortName:"PPMP EMOO",

        region:"PPMP"

    },

    309:{

        id:309,

        name:"Bilaspur Warehouse - Gurgaon",

        shortName:"Bilaspur",

        region:"North"

    },

    36:{

        id:36,

        name:"Bangalore - New Whitefield W/H",

        shortName:"Bangalore",

        region:"South"

    },

    31055:{

        id:31055,

        name:"Ekart Fashion FC WFLD 01",

        shortName:"Ekart WFLD",

        region:"South"

    },

    52296:{

        id:52296,

        name:"Gurugram Sec 10 Mnow",

        shortName:"Sec 10",

        region:"North"

    },

    15774:{

        id:15774,

        name:"Myntra Stellar FC",

        shortName:"Stellar",

        region:"East"

    },

    52292:{

        id:52292,

        name:"Faridabad Sec 37 Mnow",

        shortName:"Faridabad",

        region:"North"

    },

    28:{

        id:28,

        name:"Gurgaon-Binola W/H",

        shortName:"Binola",

        region:"North"

    },

    62991:{

        id:62991,

        name:"Gurugram Sec 28 Chakkarpur Mnow",

        shortName:"Chakkarpur",

        region:"North"

    },

    52291:{

        id:52291,

        name:"Gurugram Sec 85 Mnow",

        shortName:"Sec 85",

        region:"North"

    },

    52285:{

        id:52285,

        name:"Gurugram Sec 23 Mnow",

        shortName:"Sec 23",

        region:"North"

    },

    52289:{

        id:52289,

        name:"Gurugram Sec 103 Mnow",

        shortName:"Sec 103",

        region:"North"

    }

};

/**
 * =====================================================
 * Get Warehouse
 * =====================================================
 */

export function getWarehouse(

    warehouseId

){

    return (

        WarehouseMap[

            Number(

                warehouseId

            )

        ] ||

        null

    );

}