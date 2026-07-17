/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Style Loader
 * Author  : Saurabh Mondal & Magical CTO
 * =====================================================
 */

const loadedStyles = new Set();

export async function loadStyle(path) {

    if (loadedStyles.has(path)) {
        return;
    }

    const link = document.createElement("link");

    link.rel = "stylesheet";

    link.href = path;

    document.head.appendChild(link);

    await new Promise((resolve, reject) => {

        link.onload = resolve;

        link.onerror = () => {

            reject(
                new Error(`Unable to load stylesheet : ${path}`)
            );

        };

    });

    loadedStyles.add(path);

}