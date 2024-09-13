import {cactusPri, borderBlack} from "../constants/colors.js"

export function Cactus(canvas, x, y, scale = 1) {
    this.canvas = canvas;
    this.scale = scale;
    this.x = x;
    this.y = y;
    this.armAngle = 0;
    this.armTilt = 0.5;
    this.velocity=2.5;
}

Cactus.prototype.ratio = function (value) {
    return value * this.scale;
}

Cactus.prototype.draw = function () {
    this.canvas.save();
    this.canvas.translate(this.x, this.y);
    this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.canvas.fillStyle = cactusPri;
    this.canvas.strokeStyle = borderBlack;
    
    this.drawBody();
    this.arms();
    
    this.canvas.restore();
}

Cactus.prototype.drawBody = function (){
    this.canvas.fillStyle = cactusPri;
    this.canvas.strokeStyle = borderBlack;
    this.canvas.beginPath();
    this.canvas.moveTo(-7.5, this.ratio(30));
    this.canvas.lineTo(-7.5, this.ratio(-50));
    this.canvas.quadraticCurveTo(0, this.ratio(-70), 7.5, this.ratio(-50));
    this.canvas.lineTo(7.5, this.ratio(30));
    this.canvas.lineTo(-7.5, this.ratio(30));
    this.canvas.stroke();
    this.canvas.fill();
}

Cactus.prototype.arms = function (){
    this.canvas.save();
    this.canvas.translate(0, this.ratio(-25));
    this.canvas.strokeStyle = borderBlack;
    this.canvas.fillStyle = cactusPri;
    this.canvas.rotate(this.armAngle*(Math.PI/180));
    this.canvas.beginPath();
    this.canvas.moveTo(0,0);
    this.canvas.lineTo(15, 0);
    this.canvas.lineTo( 15, this.ratio(-45));
    this.canvas.quadraticCurveTo(20, this.ratio(-55), 25, this.ratio(-45));
    this.canvas.lineTo(25, this.ratio(10));
    this.canvas.lineTo(-25, this.ratio(10))
    this.canvas.lineTo(-25, this.ratio(-25));
    this.canvas.quadraticCurveTo(-20, this.ratio(-35), -15, this.ratio(-25));
    this.canvas.lineTo(-15, 0);
    this.canvas.lineTo(0, 0);
    this.canvas.stroke();
    this.canvas.fill();
    this.canvas.restore();
}

Cactus.prototype.update = function (angle) {
    const canvas = document.getElementById("canvas");
    
    this.armAngle+=this.armTilt;
    
    if (this.armAngle>15 && this.armAngle>0){
        this.armTilt=-0.5;
    }
    
    if(this.armAngle<-15 && this.armAngle<0){
        this.armTilt=0.5;
    }
    
    if (angle===0){
        this.y+=this.velocity;
        if (this.y>canvas.height+60){
            return -1;
        }
    }else if (angle===90){
        this.x-=this.velocity
        if (this.x<-60){
            return -1;
        }
    }else if (angle===180){
        this.y-=this.velocity;
        if (this.y<-60){
            return -1;
        }
    }else if (angle===270){
        this.x+=this.velocity;
        if (this.x>canvas.width+50){
            return -1;
        }
    }
    return null;
}