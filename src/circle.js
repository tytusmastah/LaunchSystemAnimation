class BigCircle{
    draw() {
        this.drawBigCircle();
    }

    point(s, point) {
        this.pointCircle(s, point);
    }

    translate(s, point){
        this.translateCircle(s, point);
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


    drawBigCircle() {
        noFill();
        stroke(128);
        strokeWeight(2.5*multiplicationFactor);
        circle(middle, cposy, radius * 2); //main circle
        stroke(255);
        arc(middle, cposy, radius * 2, radius * 2, -PI, -HALF_PI); //passed time arc
        strokeWeight(1*multiplicationFactor);
        line(middle, cposy - radius - pypec*multiplicationFactor, middle, cposy - radius + pypec*multiplicationFactor);  //border of passed time
        strokeWeight(2*multiplicationFactor);
        stroke(128);
        fill('rgba(40, 40, 40, 0.2)');
        circle(middle, cposy, radius * 2 - 60*multiplicationFactor); //big circle in a middle
    }


    pointCircle(s, point){
        //calculate position of point
        s.pt = point.time - time.time; //position of point in relation to current time
        s.fractionx = sin(s.pt * density / time.alltime); //rotation of point X
        s.fractiony = -cos(s.pt * density / time.alltime); //rotation of point Y
        s.x = radius * s.fractionx; //position X on a circle of point
        s.y = radius * s.fractiony; //position Y on a circle of point

        s.x += middle;
        s.y += cposy;

        if (s.y>resy*1.1){ //point below the half of circle - don't draw it to speedup
            return;
        }

        //calculate position of indicator on point
        s2 = indicatorOnPoint(point);

        s.linex0 = (radius + s2.linestart) * s.fractionx + middle;
        s.liney0 = (radius + s2.linestart) * s.fractiony + cposy;
        s.linex1 = (radius + s2.lineend) * s.fractionx + middle;
        s.liney1 = (radius + s2.lineend) * s.fractiony + cposy;
    }

    translateCircle(s, point){
        translate(middle, cposy);
        rotate(s.pt * density / time.alltime, [radius]);
        translate(0, -radius + (15*multiplicationFactor * point.pos));
    }

}