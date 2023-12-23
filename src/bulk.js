const bulk_max_spread = 60;


class Bulk {

    free;
    maxheight;
    mf;
    level;


    draw() {
        // this.drawLine();
        // this.drawBulk();
        this.drawLine();
        this.drawSine();
        console.log("draw");
    }

    point(s, point) {
        this.pointCircle(s, point);
    }

    translate(s, point) {
        this.translateBulk(s, point);
        ;
    }

    subtitle() {
        drawSubtitle();
    }

    pointTextBefore(point) {
        drawPointText(point);
    }

    pointTextAfter(point) {
        drawPointText(point);
    }

    constructor(cpoints) {
        subtitleXPos = config.subtitlePosX;
        console.log("cposy: " + cposy);
        console.log("this: ", this);
        radius = config.bigCircleRadius * multiplicationFactor;
        this.prepareBulk(cpoints);
        this.free = 60;
        this.maxheight = config.screenResolutionY - this.free - this.free;
        this.mf = multiplicationFactor;
        this.level = (config.screenResolutionY - this.free) * this.mf;
    }


    prepareBulk() {
        cpoints.forEach(point => {
            //speed (10-20)
            let speed = Math.floor(random() * 10 + 10);
            //spread (-20-80)
            let spread = Math.floor(random() * (bulk_max_spread))+bulk_max_spread-50;
            //length (20-100)
            let len = Math.floor(random() * 80 + 20);
            //amplitude (30-80)
            let amplitude = Math.floor(random() * 50 + 30);
            if (random()>0.5){
                amplitude = -amplitude;
                spread=-spread;
            }
            point.sinusoid={ speed, spread, len, amplitude }
        });
    }

    drawSine() {
        strokeWeight(0.5 * multiplicationFactor);
        cpoints.forEach(point=>{
                let s = point.sinusoid;
                noFill();
                stroke(150);
                let lastpoint = {x: config.screenResolutionX / 3, y: this.level}

                for (let i = 0; i < config.screenResolutionX * 2 / 3; i++) {
                    let newpoint=this.position(i, s);
                    line(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y);
                    lastpoint=newpoint;
                }
            })
    }

    position(i, s){
        return {
            y: this.level+Math.cos(i / s.len) * s.amplitude * Math.sin(i/config.screenResolutionX)+ s.spread*(i/config.screenResolutionX),
            x: config.screenResolutionX / 3 + i
        }
    }

    drawLine() {
        noFill();
        stroke(256);
        strokeWeight(2.5 * multiplicationFactor);

        line(0, this.level, config.screenResolutionX / 3, this.level);
    }


    pointCircle(s, point) {
        //calculate position of point
        s.pt = point.time - time.time; //position of point in relation to current time
        if (s.pt<=0){
            s.x=config.screenResolutionX /3 +s.pt *  density * 700 / time.alltime;
            s.y=this.level;
        }else{
            let pos = this.position(s.pt*point.sinusoid.speed/config.density, point.sinusoid);
            s.y=pos.y;
            s.x=pos.x;
        }

        //calculate position of indicator on point
        s2 = indicatorOnPoint(point);

        s.linex0 = s.x;
        s.liney0 = s2.linestart + s.y;
        s.linex1 = s.x;
        s.liney1 = s2.lineend + s.y;
        s.linex2 = s.x;
        s.liney2 = s2.lineend * 2 + s.y;

    }

    translateBulk(s, point) {
        translate(s.linex2, s.liney2);


    }

}