import {playerPri, playerSec, enemyPri, enemySec,borderWhite,borderBlack} from "../constants/colors.js"

export function Helicopter(
    canvas, x = 0,
    y = 0,
    scale = 1,
    isEnemy = false,
    angle = 0,
    propellerSpeed = 0.1
) {
    this.canvas = canvas;
    this.scale = scale;
    this.isEnemy = isEnemy;
    this.angle = angle;
    this.propellerSpeed = propellerSpeed;
    this.propellerAngle = 0;
    this.x = x;
    this.y = y;
    this.hit = false;
    this.velocity = 2.5;
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

Helicopter.prototype.update = function () {
    // Update based on user actions and if hit
    const canvas = document.getElementById("canvas");
    this.propellerAngle += this.propellerSpeed;
    if (this.angle === 0) {
        this.y -= this.velocity;
        if (this.y < -200) {
            this.angle = 90;
            this.x = 0;
            this.y = canvas.height / 2;
        }
    } else if (this.angle === 90) {
        this.x += this.velocity;
        if (this.x > canvas.width + 200) {
            this.angle = 180;
            this.x = canvas.width / 2;
            this.y = 0;
        }
    } else if (this.angle === 180) {
        this.y += this.velocity;
        if (this.y > canvas.height + 200) {
            this.angle = 270;
            this.x = canvas.width;
            this.y = canvas.height / 2;
        }
    } else if (this.angle === 270) {
        this.x -= this.velocity;
        if (this.x < -200) {
            this.angle = 0;
            this.x = canvas.width / 2;
            this.y = canvas.height;
        }
    }
    return this.angle;
}

Helicopter.prototype.ratio = function (value) {
    return value * this.scale;
}

Helicopter.prototype.drawBody = function (primaryColor, secondaryColor) {

    this.canvas.rotate(this.angle * Math.PI / 4);

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