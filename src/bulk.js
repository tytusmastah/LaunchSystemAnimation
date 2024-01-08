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
        drawPointText(point, 190);
    }

    pointTextAfter(point) {
        drawPointText(point, 255);
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
            //speed (10-20) of points
            let speed = Math.floor(random() * 10 + 10);
            //spread (-20-80) - how heigh is a bulk of sinusoids
            let spread = Math.floor(random() * (bulk_max_spread)) + bulk_max_spread - 50;
            //how fast sinusoid is moved
            let spreadChangeSpeed = Math.floor(random() * 9) + 1;
            //length (20-100)
            let len = Math.floor(random() * 80 + 20);
            //amplitude (30-80)
            let amplitude = Math.floor(random() * 50 + 30);
            //amplitude change speed 
            let amplitudeChangeSpeed = Math.floor(random() * 9) + 1;
            if (random() > 0.5) {
                amplitude = -amplitude;
                spread = -spread;
            }
            point.sinusoid = { speed, spread, len, amplitude, spreadChangeSpeed, amplitudeChangeSpeed }
            // console.log("sine: ", point);
        });
    }

    drawSine() {
        strokeWeight(0.5 * multiplicationFactor);
        cpoints.forEach(point => {
            if (point.time >= time.time) {
                let s = point.sinusoid;
                noFill();
                stroke(256);
                let lastpoint = { x: config.screenResolutionX * multiplicationFactor / 3, y: this.level }

                for (let i = 0; i < config.screenResolutionX * multiplicationFactor * 2 / 3; i++) {
                    let newpoint = this.position(i, s, time.time);
                    line(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y);
                    lastpoint = newpoint;
                }
            }
        })
    }

    position(i, s, time) {
        let spread = s.spread * sin(time / s.spreadChangeSpeed / 8);
        let amplitude = s.amplitude * sin(time / s.amplitudeChangeSpeed / 11);
        return {
            y: this.level + //base level
                Math.cos(i / s.len) * amplitude * Math.sin(i / config.screenResolutionX * multiplicationFactor) +  //cosinusoid flattening near 0
                spread * (i / config.screenResolutionX * multiplicationFactor), //spread
            x: config.screenResolutionX * multiplicationFactor/ 3 + i
        }
    }

    drawLine() {
        noFill();
        stroke(256);
        strokeWeight(2.5 * multiplicationFactor);

        line(0, this.level, config.screenResolutionX * multiplicationFactor / 3, this.level);
    }


    pointCircle(s, point) {
        //calculate position of point
        s.pt = point.time - time.time; //position of point in relation to current time
        if (s.pt <= 0) {
            s.x = config.screenResolutionX * multiplicationFactor / 3 + s.pt * config.density * multiplicationFactor * 700 / time.alltime;
            s.y = this.level;
        } else {
            let pos = this.position(s.pt * point.sinusoid.speed / (config.density / multiplicationFactor), point.sinusoid, time.time);
            s.y = pos.y;
            s.x = pos.x;
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