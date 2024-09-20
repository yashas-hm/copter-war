import {enemies, missiles, updateEnemies} from "./commons.js";
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
            this.checkCollision(enemy);
            const result = enemy.update(delta);
            if (result != null && result === -1) {
                updateEnemies(enemies.slice(1, enemies.length));
                continue;
            }
            enemy.draw();
        }
    }
    
    checkCollision(enemy){
        for (let missile in missiles){
            if ((missile.x<enemy.x-20 && missile.x>enemy.x+20) && missile.y<enemy.y-10){
                missile.hit = true;
                enemy.hit = true;
                console.log('hit');
                break;
            }
        }
    }
    
}