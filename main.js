import {Helicopter} from "./sprites/helicopter.js";
import {Cactus} from "./sprites/cactus.js";

window.onload = () => {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        const copter = new Helicopter(ctx, 300, 700);
        let cacti = [];
        let fps = 0;
        let framesPerSec = 0;
        let copterAngle = 0;
        let previousAngle = 90;
        setInterval(function () {
                fps = framesPerSec;
                framesPerSec = 0;
            },
            1000
        );
        let spawnInterval;

        // setInterval(function () {
        //     setTimeout(function () {
        //
        //         }, getRandom(100, 400)
        //     );
        // }, 500);

        function getRandom(min, max) {
            const minCeil = Math.ceil(min);
            const maxFloored = Math.floor(max);
            return Math.floor(Math.random() * (maxFloored - minCeil + 1) + minCeil);
        }

        function resetGameWindow() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#efb884";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#1c1c1c";
            ctx.font = "24px serif";
            ctx.fillText("Score: 0", 10, 30);
            ctx.fillText("FPS: " + fps, 10, 60);
            ++framesPerSec;
        }

        function drawPlayer() {
            const result = copter.update();
            if (result != null) {
                copterAngle = result;
            }
            copter.draw();
        }

        function drawCactus() {
            for (let cactus of cacti) {
                const result = cactus.update(copterAngle);
                if (result != null && result === -1) {
                    cacti = cacti.slice(1, cacti.length);
                    continue;
                }
                cactus.draw();
            }
        }

        function spawnCacti() {
            if (previousAngle !== copterAngle) {
                previousAngle = copterAngle;
                if (spawnInterval != null || spawnInterval !== undefined) {
                    clearInterval(spawnInterval);
                }

                spawnInterval = setInterval(
                    function (){
                        setTimeout(function (){
                            if (copterAngle===0){
                                cacti.push(new Cactus(ctx, getRandom(0, canvas.width), -60),);
                            }else if (copterAngle===90){
                                cacti.push(new Cactus(ctx, canvas.width+60, getRandom(0, canvas.height-30)),);
                            }else if (copterAngle===180){
                                cacti.push(new Cactus(ctx, getRandom(0, canvas.width), canvas.height+60),);
                            }else if (copterAngle===270){
                                cacti.push(new Cactus(ctx, -60, getRandom(0, canvas.height-30)),);
                            }
                        }, getRandom(300,400));
                    },
                    500
                );
            }
        }

        function main() {
            resetGameWindow();
            spawnCacti();
            drawCactus();
            drawPlayer();
            requestAnimationFrame(main);
        }

        requestAnimationFrame(main);
    }
}

































