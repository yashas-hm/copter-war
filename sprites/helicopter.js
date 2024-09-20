import {borderBlack, borderWhite, enemyPri, enemySec, playerPri, playerSec} from "../constants/colors.js"

export function Helicopter(
    canvas, x = 0,
    y = 0,
    scale = 1,
    isEnemy = false,
    propellerSpeed = 0.1
) {
    this.canvas = canvas;
    this.scale = scale;
    this.isEnemy = isEnemy;
    this.propellerSpeed = propellerSpeed;
    this.propellerAngle = 0;
    this.x = x;
    this.y = y;
    this.hit = false;
    this.velocity = 0.2;
}

Helicopter.prototype.draw = function () {
    this.canvas.save();
    let primaryColor;
    let secondaryColor;
    if (this.isEnemy) {
        primaryColor = enemyPri;
        secondaryColor = enemySec;
    } else {
        primaryColor = playerPri;
        secondaryColor = playerSec;
    }

    this.canvas.translate(this.x, this.y);
    this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBody(primaryColor, secondaryColor);
    this.drawPropellers();
    this.canvas.restore();
};

Helicopter.prototype.update = function (delta, input) {
    const canvas = document.getElementById("canvas");

    if (this.hit) {
        this.scale -= this.velocity / 2 * delta;
        if (this.scale <= 0.4) {
            return -1;
        }
        if (this.isEnemy){
            this.y += this.velocity / 2 * delta;
            if (this.y > canvas.height + 100) {
                return -1;
            }    
        }else{
            this.y -= this.velocity / 2 * delta;
        }
        
    } else {
        this.propellerAngle += this.propellerSpeed * delta;
        if (this.isEnemy) {
            this.y += this.velocity * delta;
            if (this.y > canvas.height + 100) {
                return -1;
            }
        } else {
            if (input.ArrowUp) {
                if (this.y>=canvas.height/5){
                    this.y -= this.velocity / 1.3 * delta;   
                }
            }

            if (input.ArrowDown) {
                if (this.y<=canvas.height-60){
                    this.y += this.velocity / 1.3 * delta;   
                }
            }
            
            if (input.ArrowRight) {
                if (this.x<=canvas.width-60) {
                    this.x += this.velocity / 1.3 * delta;
                }
            }
            
            if (input.ArrowLeft) {
                if (this.x>=60){
                    this.x -= this.velocity / 1.3 * delta;   
                }
            }
        }
    }
    return null;
}

Helicopter.prototype.ratio = function (value) {
    return value * this.scale;
}

Helicopter.prototype.drawBody = function (primaryColor, secondaryColor) {

    if (this.isEnemy){
        this.canvas.rotate(180 * Math.PI / 4);    
    }

    // Below Cockpit
    this.canvas.strokeStyle = borderWhite;
    this.canvas.fillStyle = secondaryColor;
    this.canvas.beginPath();
    this.canvas.moveTo(this.ratio(-20), this.ratio(50));
    this.canvas.lineTo(this.ratio(20), this.ratio(50));
    this.canvas.lineTo(this.ratio(20), this.ratio(80));
    this.canvas.lineTo(this.ratio(-20), this.ratio(80));
    this.canvas.lineTo(this.ratio(-20), this.ratio(50));
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.closePath();

    // Cockpit
    this.canvas.fillStyle = primaryColor;
    this.canvas.strokeStyle = borderBlack;
    this.canvas.beginPath();
    this.canvas.moveTo(this.ratio(-15), 0);
    this.canvas.quadraticCurveTo(0, this.ratio(-40), this.ratio(15), 0);
    this.canvas.quadraticCurveTo(this.ratio(35), this.ratio(60), 0, this.ratio(60));
    this.canvas.quadraticCurveTo(this.ratio(-35), this.ratio(60), this.ratio(-15), 0);
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.closePath();

    // Wings
    this.canvas.fillStyle = primaryColor;
    this.canvas.strokeStyle = borderBlack;
    this.canvas.beginPath();
    this.canvas.moveTo(this.ratio(-15), this.ratio(30));
    this.canvas.lineTo(this.ratio(-50), this.ratio(45));
    this.canvas.lineTo(this.ratio(-50), this.ratio(60));
    this.canvas.lineTo(this.ratio(-5), this.ratio(60));
    this.canvas.lineTo(this.ratio(-15), this.ratio(35));
    this.canvas.moveTo(this.ratio(15), this.ratio(30));
    this.canvas.lineTo(this.ratio(50), this.ratio(45));
    this.canvas.lineTo(this.ratio(50), this.ratio(60));
    this.canvas.lineTo(this.ratio(5), this.ratio(60));
    this.canvas.lineTo(this.ratio(15), this.ratio(35));
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.closePath();

    // Window
    this.canvas.fillStyle = "#5c8e87";
    this.canvas.strokeStyle = borderBlack;
    this.canvas.beginPath();
    this.canvas.moveTo(this.ratio(-10), 0);
    this.canvas.quadraticCurveTo(0, this.ratio(-30), this.ratio(10), 0);
    this.canvas.quadraticCurveTo(this.ratio(15), this.ratio(15), 0, this.ratio(15));
    this.canvas.quadraticCurveTo(this.ratio(-15), this.ratio(15), this.ratio(-10), 0);
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.closePath();

    // Tail
    this.canvas.fillStyle = primaryColor;
    this.canvas.strokeStyle = borderBlack;
    this.canvas.beginPath();
    this.canvas.moveTo(this.ratio(-15), this.ratio(80));
    this.canvas.lineTo(this.ratio(-5), this.ratio(180));
    this.canvas.lineTo(this.ratio(-30), this.ratio(182.5));
    this.canvas.lineTo(this.ratio(-30), this.ratio(187.5));
    this.canvas.lineTo(this.ratio(-5), this.ratio(190));
    this.canvas.lineTo(0, this.ratio(195));
    this.canvas.lineTo(this.ratio(5), this.ratio(190));
    this.canvas.lineTo(this.ratio(30), this.ratio(187.5));
    this.canvas.lineTo(this.ratio(30), this.ratio(182.5));
    this.canvas.lineTo(this.ratio(5), this.ratio(180));
    this.canvas.lineTo(this.ratio(15), this.ratio(80));
    this.canvas.lineTo(this.ratio(-15), this.ratio(80));
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.closePath();

    // Propeller Motor Housing
    this.canvas.fillStyle = secondaryColor;
    this.canvas.strokeStyle = borderWhite;
    this.canvas.beginPath();
    this.canvas.moveTo(this.ratio(-10), this.ratio(40));
    this.canvas.lineTo(this.ratio(10), this.ratio(40));
    this.canvas.lineTo(this.ratio(10), this.ratio(90));
    this.canvas.lineTo(this.ratio(-10), this.ratio(90));
    this.canvas.lineTo(this.ratio(-10), this.ratio(40));
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.closePath();
}

Helicopter.prototype.drawPropellers = function () {
    this.canvas.save();
    this.canvas.translate(0, this.ratio(70));
    this.canvas.fillStyle = borderBlack;
    this.canvas.strokeStyle = borderWhite;
    this.canvas.beginPath();
    this.canvas.rotate(this.propellerAngle);
    this.canvas.moveTo(this.ratio(2.5), this.ratio(2.5));
    this.canvas.lineTo(this.ratio(2.5), this.ratio(122.5));
    this.canvas.lineTo(this.ratio(-5), this.ratio(112.5));
    this.canvas.lineTo(this.ratio(-5), this.ratio(52.5));
    this.canvas.lineTo(this.ratio(-2.5), this.ratio(42.5));
    this.canvas.lineTo(this.ratio(-2.5), this.ratio(2.5));
    this.canvas.lineTo(this.ratio(-122.5), this.ratio(2.5));
    this.canvas.lineTo(this.ratio(-112.5), this.ratio(-7.5));
    this.canvas.lineTo(this.ratio(-52.5), this.ratio(-7.5));
    this.canvas.lineTo(this.ratio(-42.5), this.ratio(-2.5));
    this.canvas.lineTo(this.ratio(-2.5), this.ratio(-2.5));
    this.canvas.lineTo(this.ratio(-2.5), this.ratio(-122.5));
    this.canvas.lineTo(this.ratio(7.5), this.ratio(-112.5));
    this.canvas.lineTo(this.ratio(7.5), this.ratio(-52.5));
    this.canvas.lineTo(this.ratio(2.5), this.ratio(-42.5));
    this.canvas.lineTo(this.ratio(2.5), this.ratio(-2.5));
    this.canvas.lineTo(this.ratio(122.5), this.ratio(-2.5));
    this.canvas.lineTo(this.ratio(112.5), this.ratio(7.5));
    this.canvas.lineTo(this.ratio(52.5), this.ratio(7.5));
    this.canvas.lineTo(this.ratio(42.5), this.ratio(2.5));
    this.canvas.lineTo(this.ratio(2.5), this.ratio(2.5));
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.closePath();
    this.canvas.restore();
}