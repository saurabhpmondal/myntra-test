/**
 * =====================================================
 * Project Phoenix
 * Phoenix Framework
 * File : query.js
 * Purpose : DOM Query
 * =====================================================
 */

export function $(selector) {

    return document.querySelector(selector);

}

export function $$(selector) {

    return [...document.querySelectorAll(selector)];

}
