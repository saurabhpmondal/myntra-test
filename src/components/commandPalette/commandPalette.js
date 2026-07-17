/**
 * =====================================================
 * Project Phoenix
 * Command Palette
 * Version : 1.0
 * =====================================================
 */

import { createComponent } from "../../utils/createComponent.js";

let isOpen = false;

export async function renderCommandPalette() {

    const root = document.getElementById("root");

    const container = document.createElement("div");

    container.id = "command-palette-root";

    root.appendChild(container);

    await createComponent({

        target: container,

        html: "src/components/commandPalette/commandPalette.html",

        css: "src/components/commandPalette/commandPalette.css"

    });

    bindShortcuts();

}

function bindShortcuts() {

    document.addEventListener("keydown", (event) => {

        if (
    event.ctrlKey &&
    event.shiftKey &&
    event.key.toLowerCase() === "k"
) {

            event.preventDefault();

            togglePalette();

        }

        if (event.key === "Escape") {

            closePalette();

        }

    });

}

function togglePalette() {

    if (isOpen) {

        closePalette();

        return;

    }

    openPalette();

}

function openPalette() {

    const palette = document.getElementById("commandPalette");

    if (!palette) return;

    palette.classList.remove("hidden");

    isOpen = true;

    setTimeout(() => {

        document.getElementById("cpInput")?.focus();

    }, 50);

}

function closePalette() {

    const palette = document.getElementById("commandPalette");

    if (!palette) return;

    palette.classList.add("hidden");

    isOpen = false;

}