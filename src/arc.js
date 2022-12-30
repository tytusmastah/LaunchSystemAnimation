class Arc{
    draw() {
        this.drawLeftArc();
    }

    point(s, point) {
        this.pointCircle(s, point);
    }

    translate(s, point){
        this.translateArc(s, point);
    }

    subtitle(){
        drawSubtitle();
    }

    pointTextBefore(point){
        drawPointText(point);
    }

    pointTextAfter(point){
        drawPointText(point);
    }

    constructor(){
        subtitleXPos = config.subtitlePosX;
        console.log("cposy: " + cposy); 
        console.log("this: ", this);
        radius = config.bigCircleRadius;
    }

    drawLeftArc() {
        noFill();
        stroke(128);
        strokeWeight(2.5*multiplicationFactor);
        circle(0, cposy, radius*2); //main circle
        stroke(255);
        arc(0, cposy, radius*2, radius*2, -HALF_PI, -HALF_PI/2); //passed time arc
        strokeWeight(1*multiplicationFactor);
        // line(0, cposy - radius - pypec*multiplicationFactor, middle, cposy - radius + pypec*multiplicationFactor);  //border of passed time
        strokeWeight(2*multiplicationFactor);
        stroke(128);
        fill('rgba(40, 40, 40, 0.2)');
        arc(config.screenResolutionX, cposy, radius*2, radius*2/3, -PI, 0); //right arc
    }


    pointCircle(s, point){
        //calculate position of point
        s.pt = point.time - time.time; //position of point in relation to current time
        s.fractionx = sin(HALF_PI/2 + s.pt * density / time.alltime); //rotation of point X
        s.fractiony = -cos(HALF_PI/2 + s.pt * density / time.alltime); //rotation of point Y
        s.x = radius * s.fractionx; //position X on a circle of point
        s.y = radius * s.fractiony; //position Y on a circle of point

        // s.x += middle;
        s.y += cposy;


        if (s.x<-10*config.multiplicationFactor || s.y>config.screenResolutionY+10*multiplicationFactor){ //point below the half of circle - don't draw it to speedup
            s.linex0=s.linex1=s.liney0=s.liney1=s.linex2=s.liney2=-200;
            return;
        }

        //calculate position of indicator on point
        s2 = indicatorOnPoint(point);

        s.linex0 = (radius + s2.linestart) * s.fractionx + 0;
        s.liney0 = (radius + s2.linestart) * s.fractiony + cposy;
        s.linex1 = (radius + 2*s2.lineend) * s.fractionx + 0;
        s.liney1 = (radius + 2*s2.lineend) * s.fractiony + cposy;
        s.linex2 = (radius + 10*s2.lineend) * s.fractionx + 0;
        s.liney2 = (radius + 10*s2.lineend) * s.fractiony + cposy;
    }

    translateArc(s, point){
        translate(s.linex2, s.liney2);

        rotate(Math.asin((s.x)/radius)-HALF_PI)
        // rotate(-HALF_PI/2+s.pt * density / time.alltime, [radius]);
        // translate(-radius, 0); 
        // translate(0,-config.screenResolutionY);
        // translate(0, config.screenResolutionY);

        // translate(0, config.screenResolutionY);
        // rotate(s.pt * density / time.alltime, [radius]);
        // translate(0, -radius + (15*multiplicationFactor * point.pos));
        
    }

}