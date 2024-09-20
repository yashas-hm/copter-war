import {keyInputs} from "./scripts/commons.js";
import {runOnLoad} from "./constants/helper.js";

// Process Inputs
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) return;
    keyInputs[event.key] = true;
    event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) return;
    keyInputs[event.key] = false;
    event.preventDefault();
}, true)

window.onload = runOnLoad;