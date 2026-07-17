/**
 * =====================================================
 * Project Phoenix
 * Phoenix Framework
 * File : classes.js
 * Purpose : CSS Class Helpers
 * =====================================================
 */

export function addClass(element, ...classes) {

    element.classList.add(...classes);

}

export function removeClass(element, ...classes) {

    element.classList.remove(...classes);

}
