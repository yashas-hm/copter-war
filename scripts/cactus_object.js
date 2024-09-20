import {cacti, updateCacti} from "./commons.js";
import {Cactus} from "../sprites/cactus.js";
import {getRandom} from "../constants/helper.js";

export class CactusObject {
    constructor(context, canvas) {
        this.context = context;
        this.cactusSpawnInterval = setInterval(
            function () {
                setTimeout(function () {
                        cacti.push(new Cactus(context, getRandom(0, canvas.width), -60, 0.6));
                    }, getRandom(300, 400)
                );
            },
            500
        );
    }

    update(delta) {
        for (let cactus of cacti) {
            const result = cactus.update(delta);
            if (result != null && result === -1) {
                updateCacti(cacti.slice(1, cacti.length));
                continue;
            }
            cactus.draw();
        }
    }
}