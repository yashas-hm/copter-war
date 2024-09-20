import {fps, framesPerSecond, score, updateFrames} from "./commons.js";
import {desertPri} from "../constants/colors.js";

export class GameObject {
    constructor(context) {
        this.lastFrameTimeMs = 0;
        this.delta = 0;
        this.context = context;
    }

    resetGameWindow(canvas) {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.fillStyle = desertPri;
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.context.fillStyle = "#1c1c1c";
        this.context.font = "24px serif";
        this.context.fillText(`Score: ${score}`, 10, 30);
        this.context.fillText(`FPS: ${fps}`, 10, 60);
        updateFrames(framesPerSecond + 1);
    }

    calcDelta(timestamp) {
        this.delta = timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;
    }
}