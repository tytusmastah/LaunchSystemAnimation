const bulk2_max_spread = 30;


class Bulk2 {

    free;
    maxheight;
    mf;
    level;
    boldLineLength;


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
        this.prepareBulk2(cpoints);
        // console.log('po preparebulk2', cpoints);
        this.free = 60;
        this.maxheight = config.screenResolutionY - this.free - this.free;
        this.mf = multiplicationFactor;
        this.level = (config.screenResolutionY - this.free) * this.mf;
        this.boldLineLength = config.screenResolutionX * multiplicationFactor / 9
    }


    prepareBulk2(preppoints) {
        console.log("Prepare bulk2")
        preppoints.forEach(point => {
            //speed (10-20) of points
            let speed = Math.floor(random() * 10 + 10);
            //spread (-20-80) - how heigh is a bulk of sinusoids
            let spread = Math.floor(random() * (bulk2_max_spread)) + bulk2_max_spread - 50;
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
            point.sinusoid = new LauncherSinusoid(speed, spread, len, amplitude, spreadChangeSpeed, amplitudeChangeSpeed);
            // console.log("sine: ", point);
        });
        // console.log('cpoints', preppoints);
    }

    /** Draws every sinusoid which should be displayed */
    drawSine() {
        strokeWeight(0.5 * multiplicationFactor);
        points.forEach(point => {
            if (point.time >= time.time) {
                let s = point.sinusoid;
                noFill();
                //change color as a function of distance from last
                const strokeColor1 = 200-((point.index-lastInactiveIndex+1)*(point.index-lastInactiveIndex+1)%200);
                const strokeColor2 = 200-((point.index-lastInactiveIndex+1)*(point.index-lastInactiveIndex+1)*2%200);
                const strokeColor3 = 200-((point.index-lastInactiveIndex+1)*5%200);

                stroke(strokeColor2, strokeColor3, strokeColor1);
                let lastpoint = { x: this.boldLineLength, y: this.level }

                for (let i = 0; i < config.screenResolutionX * multiplicationFactor * 2 / 2; i++) {
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
                spread * (i / config.screenResolutionX * multiplicationFactor)+  //spread
                0, //(i/s.len)*(i/s.len)/5, //further - lower
            x: this.boldLineLength + i
        }
    }

    /** Draw main line */
    drawLine() {
        noFill();
        stroke(256);
        strokeWeight(2.5 * multiplicationFactor);

        line(0, this.level, this.boldLineLength, this.level);
    }


    /** draws point */
    pointCircle(s, point) {
        //calculate position of point
        s.pt = point.time - time.time; //position of point in relation to current time
        if (s.pt <= 0) {
            s.x = this.boldLineLength + s.pt * config.density * multiplicationFactor * 700 / time.alltime;
            s.y = this.level;
            //position of past circle
            if (lastInactiveIndex > 0) {
                if (point.index === lastInactiveIndex) {
                    //if this is the last - and > 1/18 - move normally
                    if (s.x > this.boldLineLength / 2) {
                        ;
                    } else {
                        //if this is the last - and <=1/18 - stay still
                        s.x = this.boldLineLength / 2;
                    }
                } else {
                    //if this is not the last move in 1/18 of the last times the distance to last

                    const maxDistance = (lastInactiveIndex - point.index) * (this.boldLineLength / 2);
                    const lastPointTime = points[lastInactiveIndex].time - time.time;
                    const lastPointPositionX = this.boldLineLength
                        + lastPointTime * config.density * multiplicationFactor * 700 / time.alltime;
                    if (lastPointPositionX - s.x > maxDistance) {
                        s.x = (lastPointPositionX - maxDistance)
                    }
                    if (s.x < this.boldLineLength/2){
                        s.x = s.x-(this.boldLineLength / 2- s.x)/2;
                    }
                }
            }
        } else {
            //position of future circle
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

        // console.log('Point', point);
        // console.log('s', s);

    }

    translateBulk(s, point) {
        translate(s.linex2, s.liney2);


    }

}