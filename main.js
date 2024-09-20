import {Helicopter} from "./sprites/helicopter.js";
import {Cactus} from "./sprites/cactus.js";

const maxFPS = 70;
const keyInputs = {};
let cacti = [];
let enemies = [];
let framesPerSecond = 0
let fps = 0;

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

function getRandom(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeil + 1) + minCeil);
}

class PlayerObject {
    constructor(context) {
        this.context = context;
        this.player = new Helicopter(context, 300, 700, 0.8);
    }

    update(delta, input) {
        this.player.update(delta, input);
        this.player.draw();
    }

}

class EnemyObject {
    constructor(context, canvas) {
        this.context = context;
        this.enemySpawnInterval = setInterval(
            function () {
                if (enemies.length<3){
                    setTimeout(function () {
                        enemies.push(new Helicopter(context, getRandom(60, canvas.width-60), -60, 0.65, true));
                    }, getRandom(300, 800));
                }
            },
            1000
        );
    }
    
    update(delta){
        for (let enemy of enemies){
            const result = enemy.update(delta);
            if (result!=null && result ===-1){
                enemies = enemies.slice(1, enemies.length);
                continue;
            }
            enemy.draw();
        }
    }
}

class CactusObject {
    constructor(context, canvas) {
        this.context = context;
        this.cactusSpawnInterval = setInterval(
            function () {
                setTimeout(function () {
                    cacti.push(new Cactus(context, getRandom(0, canvas.width), -60, 0.6));
                }, getRandom(300, 400));
            },
            500
        );
    }

    update(delta) {
        for (let cactus of cacti) {
            const result = cactus.update(delta);
            if (result != null && result === -1) {
                cacti = cacti.slice(1, cacti.length);
                continue;
            }
            cactus.draw();
        }
    }
}

class GameObject {
    constructor(context) {
        this.lastFrameTimeMs = 0;
        this.delta = 0;
        this.score = 0;
        this.context = context;
    }

    resetGameWindow(canvas) {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.fillStyle = "#efb884";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.context.fillStyle = "#1c1c1c";
        this.context.font = "24px serif";
        this.context.fillText(`Score: ${this.score}`, 10, 30);
        this.context.fillText(`FPS: ${fps}`, 10, 60);
        framesPerSecond+=1;
    }

    gameOver() {

    }

    calcDelta(timestamp) {
        this.delta = timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;
    }
}

function runOnLoad() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        const game = new GameObject(ctx);
        const cacti = new CactusObject(ctx, canvas);
        const player = new PlayerObject(ctx);
        const enemy = new EnemyObject(ctx, canvas);

        setInterval(function () {
                fps = framesPerSecond;
                framesPerSecond = 0;
            },
            1000
        );
        
        function mainLoop(timestamp) {
            if (timestamp < game.lastFrameTimeMs + (1000 / maxFPS)) {
                requestAnimationFrame(mainLoop);
                return;
            }

            game.calcDelta(timestamp);
            game.resetGameWindow(canvas);
            cacti.update(game.delta);
            player.update(game.delta, keyInputs);
            enemy.update(game.delta);

            requestAnimationFrame(mainLoop);
        }
        
        requestAnimationFrame(mainLoop);
    }
}

window.onload = runOnLoad;