/**
 * =====================================================
 * Project Phoenix
 * Phoenix Framework
 * File : dom.js
 * Purpose : DOM Utility Engine
 * Version : 0.1.0
 * =====================================================
 */

export const DOM = {

    get(selector) {
        return document.querySelector(selector);
    },

    getAll(selector) {
        return [...document.querySelectorAll(selector)];
    },

    create(tag) {
        return document.createElement(tag);
    },

    clear(element) {
        element.innerHTML = "";
    }

};
