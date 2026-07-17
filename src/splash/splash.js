import { Assets } from "../config/assets.js";
import { Version } from "../config/version.js";

let progressBar;
let statusText;
let splash;

export function showSplash() {

    const root = document.getElementById("root");

    root.innerHTML = `

    <div class="splash" id="phoenixSplash">

        <div class="splash-card">

            <img class="logo"
                 src="${Assets.logo}"
                 alt="Logo">

            <h1>${Version.app}</h1>

            <p class="subtitle">

                Fashion Data Intelligence

            </p>

            <div class="progress">

                <div id="progress"
                     class="progress-fill"></div>

            </div>

            <p id="status">

                Starting Phoenix...

            </p>

            <small>

                ${Version.release}
                •
                ${Version.version}

            </small>

        </div>

    </div>

    `;

    splash = document.getElementById("phoenixSplash");
    progressBar = document.getElementById("progress");
    statusText = document.getElementById("status");

}

export function updateSplash(percent, message){

    if(progressBar){

        progressBar.style.width = percent + "%";

    }

    if(statusText){

        statusText.textContent = message;

    }

}

export function hideSplash(){

    if(!splash) return;

    splash.style.opacity = "0";

    setTimeout(()=>{

        splash.remove();

    },400);

}