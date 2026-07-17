/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Component Loader
 * Author  : Saurabh Mondal & Magical CTO
 * =====================================================
 */

const componentCache = new Map();

/**
 * Loads an HTML component into a target element.
 * HTML is cached after first request.
 *
 * @param {HTMLElement} target
 * @param {string} path
 * @param {Object} data
 */
export async function loadComponent(target, path, data = {}) {

    if (!target) {
        throw new Error("Target element not found.");
    }

    let html;

    if (componentCache.has(path)) {

        html = componentCache.get(path);

    } else {

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Unable to load component: ${path}`);
        }

        html = await response.text();

        componentCache.set(path, html);

    }

    Object.entries(data).forEach(([key, value]) => {

        html = html.replaceAll(`{{${key}}}`, value);

    });

    target.innerHTML = html;

}