import {enemies} from "./commons.js";
import {Helicopter} from "../sprites/helicopter.js";
import {getRandom} from "../constants/helper.js";

export class EnemyObject {
    constructor(context, canvas) {
        this.context = context;
        this.enemySpawnInterval = setInterval(
            function () {
                if (enemies.length < 3) {
                    setTimeout(function () {
                            enemies.push(new Helicopter(context, getRandom(60, canvas.width - 60), -60, 0.65, true));
                        }, getRandom(300, 800)
                    );
                }
            },
            1000
        );
    }

    update(delta) {
        for (let enemy of enemies) {
            const result = enemy.update(delta);
            if (result != null && result === -1) {
                enemies = enemies.slice(1, enemies.length);
                continue;
            }
            enemy.draw();
        }
    }
}