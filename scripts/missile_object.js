import {keyInputs, missiles, updateMissile} from "./commons.js";
import {Missile} from "../sprites/missile.js"; 

export class MissileObject {
    constructor(context) {
        this.context=context;
    }
    
    update(delta, player){
        if (keyInputs.Space){
            keyInputs.Space = false;
            missiles.push(new Missile(this.context, player.x, player.y));
        }
        
        for (let missile of missiles){
            const result = missile.update(delta);
            if (result!=null || result!==undefined){
                if (result===-1){
                    updateMissile(missiles.filter((item)=>![missile].includes(item)));
                }
            }
            missile.draw();
        }
    }
}