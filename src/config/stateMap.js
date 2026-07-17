/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : India State Mapping
 * Version : V1.0
 * =====================================================
 */

export const StateMap={

    "ANDAMAN & NICOBAR ISLANDS":"Andaman and Nicobar Islands",

    "ANDAMAN AND NICOBAR ISLANDS":"Andaman and Nicobar Islands",

    "ANDHRA PRADESH":"Andhra Pradesh",

    "ARUNACHAL PRADESH":"Arunachal Pradesh",

    "ASSAM":"Assam",

    "BIHAR":"Bihar",

    "CHANDIGARH":"Chandigarh",

    "CHHATTISGARH":"Chhattisgarh",

    "DADRA & NAGAR HAVELI":"Dadra and Nagar Haveli and Daman and Diu",

    "DAMAN & DIU":"Dadra and Nagar Haveli and Daman and Diu",

    "DELHI":"Delhi",

    "NCT OF DELHI":"Delhi",

    "GOA":"Goa",

    "GUJARAT":"Gujarat",

    "HARYANA":"Haryana",

    "HIMACHAL PRADESH":"Himachal Pradesh",

    "JAMMU & KASHMIR":"Jammu and Kashmir",

    "JAMMU AND KASHMIR":"Jammu and Kashmir",

    "JHARKHAND":"Jharkhand",

    "KARNATAKA":"Karnataka",

    "KERALA":"Kerala",

    "LADAKH":"Ladakh",

    "LAKSHADWEEP":"Lakshadweep",

    "MADHYA PRADESH":"Madhya Pradesh",

    "MAHARASHTRA":"Maharashtra",

    "MANIPUR":"Manipur",

    "MEGHALAYA":"Meghalaya",

    "MIZORAM":"Mizoram",

    "NAGALAND":"Nagaland",

    "ODISHA":"Odisha",

    "ORISSA":"Odisha",

    "PUDUCHERRY":"Puducherry",

    "PONDICHERRY":"Puducherry",

    "PUNJAB":"Punjab",

    "RAJASTHAN":"Rajasthan",

    "SIKKIM":"Sikkim",

    "TAMIL NADU":"Tamil Nadu",

    "TELANGANA":"Telangana",

    "TRIPURA":"Tripura",

    "UTTAR PRADESH":"Uttar Pradesh",

    "UTTARAKHAND":"Uttarakhand",

    "UTTARANCHAL":"Uttarakhand",

    "WEST BENGAL":"West Bengal", 

"AN":"Andaman and Nicobar Islands",
"AP":"Andhra Pradesh",
"AR":"Arunachal Pradesh",
"AS":"Assam",
"BR":"Bihar",
"CH":"Chandigarh",
"CT":"Chhattisgarh",
"DD":"Dadra and Nagar Haveli and Daman and Diu",
"DL":"Delhi",
"DN":"Dadra and Nagar Haveli and Daman and Diu",
"GA":"Goa",
"GJ":"Gujarat",
"HP":"Himachal Pradesh",
"HR":"Haryana",
"JH":"Jharkhand",
"JK":"Jammu and Kashmir",
"KA":"Karnataka",
"KL":"Kerala",
"MH":"Maharashtra",
"ML":"Meghalaya",
"MN":"Manipur",
"MP":"Madhya Pradesh",
"MZ":"Mizoram",
"NL":"Nagaland",
"OR":"Odisha",
"PB":"Punjab",
"RJ":"Rajasthan",
"SK":"Sikkim",
"TG":"Telangana",
"TN":"Tamil Nadu",
"TR":"Tripura",
"TS":"Telangana",
"UP":"Uttar Pradesh",
"UT":"Uttarakhand",
"WB":"West Bengal"


};

export function normalizeState(

    state

){

    if(!state){

        return "";

    }

    const key=

        String(state)

        .trim()

        .toUpperCase();

    return StateMap[key] || state;

}