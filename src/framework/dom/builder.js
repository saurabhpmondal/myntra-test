/**
 * =====================================================
 * Project Phoenix
 * Phoenix Framework
 * File : builder.js
 * Purpose : Element Builder
 * =====================================================
 */

export function build({

    tag = "div",

    className = "",

    text = ""

}) {

    const element = document.createElement(tag);

    element.className = className;

    element.textContent = text;

    return element;

}
