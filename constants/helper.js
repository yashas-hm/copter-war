import {framesPerSecond, keyInputs, maxFPS, missiles, updateFPS, updateFrames} from "../scripts/commons.js";
import {GameObject} from "../scripts/game_object.js";
import {CactusObject} from "../scripts/cactus_object.js";
import {PlayerObject} from "../scripts/player_object.js";
import {EnemyObject} from "../scripts/enemy_object.js";
import {MissileObject} from "../scripts/missile_object.js";

export function getRandom(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeil + 1) + minCeil);
}

export function runOnLoad() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        const game = new GameObject(ctx);
        const cacti = new CactusObject(ctx, canvas);
        const player = new PlayerObject(ctx);
        const enemy = new EnemyObject(ctx, canvas);
        const missile = new MissileObject(ctx);
        
        setInterval(function () {
                updateFPS(framesPerSecond);
                updateFrames(0);
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
            missile.update(game.delta, player.player);

            requestAnimationFrame(mainLoop);
        }

        requestAnimationFrame(mainLoop);
    }
}