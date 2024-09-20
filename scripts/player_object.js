import {Helicopter} from "../sprites/helicopter.js";

export class PlayerObject {
    constructor(context) {
        this.context = context;
        this.player = new Helicopter(context, 300, 700, 0.8);
    }

    update(delta, input) {
        this.player.update(delta, input);
        this.player.draw();
    }
}