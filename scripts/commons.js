export const maxFPS = 70;

export const keyInputs = {};

export let cacti = [];

export let enemies = [];

export let score = 0;

export let framesPerSecond = 0

export let fps = 0;

export let missiles = [];

export function incrementScore(){
    ++score;
}

export function updateCacti(val){
    cacti = val;
}

export function updateEnemies(val){
    enemies = val;
}

export function updateMissile(val){
    missiles = val;
}

export function updateFrames(val){
    framesPerSecond = val;
}

export function updateFPS(val){
    fps = val;
}