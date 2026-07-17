/**
 * =====================================================
 * Project Phoenix
 * Phoenix Framework
 * File : events.js
 * Purpose : Event Helpers
 * =====================================================
 */

export function on(element, event, callback) {

    element.addEventListener(event, callback);

}

export function off(element, event, callback) {

    element.removeEventListener(event, callback);

}
