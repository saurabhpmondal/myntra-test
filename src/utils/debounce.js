/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Debounce Utility
 * Version : V1.0
 * =====================================================
 */

export function debounce(callback,delay=300){

    let timer;

    return(...args)=>{

        clearTimeout(timer);

        timer=setTimeout(()=>{

            callback(...args);

        },delay);

    };

}