import {borderBlack, missilePri, repulsionPri} from "../constants/colors.js";

export function Missile(canvas, x, y) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.velocity = 0.3;
    this.propulsionVelocity = 0.6;
    this.exhaust = 70;
    this.hit = false;
}

Missile.prototype.draw = function () {
    this.canvas.save();
    this.canvas.translate(this.x, this.y);
    this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBody();
    this.drawExhaust();

    this.canvas. restore();
}

Missile.prototype.drawBody = function () {
    this.canvas.strokeStyle = borderBlack;
    this.canvas.fillStyle = missilePri;
    this.canvas.beginPath();

    this.canvas.moveTo(-3, 0);
    this.canvas.quadraticCurveTo(0, -10, 3, 0);
    this.canvas.lineTo(3, 50);
    this.canvas.lineTo(-3, 50);
    this.canvas.lineTo(-3, 0);

    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.closePath();
}

Missile.prototype.drawExhaust = function () {
    this.canvas.strokeStyle = borderBlack;
    this.canvas.fillStyle = repulsionPri;
    this.canvas.beginPath();

    this.canvas.moveTo(-3, 50);
    this.canvas.quadraticCurveTo(-8, 60, 0, this.exhaust);
    this.canvas.quadraticCurveTo(8, 60, 3, 50)

    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.closePath();
}

Missile.prototype.update = function (delta) {
    this.exhaust += this.propulsionVelocity * delta;
    this.y -= this.velocity * delta;
    
    if (this.exhaust >= 80) {
        this.propulsionVelocity = -0.3;
    }

    if (this.exhaust <= 70) {
        this.propulsionVelocity = 0.3;
    }
    
    if (this.hit){
        return -1;
    }
    
    if (this.y<-100){
        return -1;
    }
}
