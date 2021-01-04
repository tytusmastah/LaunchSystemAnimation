function drawHorizontalLine(){
    noFill()
    stroke(128);
    stroke(128);
    strokeWeight(2.5);
    line(middle-10, lposy, config.screenResolutionX*multiplactionFactor, lposy);
    stroke(255);
    line(0,lposy,middle, lposy);
    strokeWeight(2);
    line(middle,lposy - pypec, middle, lposy+pypec);
    strokeWeight(2);
    stroke(128);
    fill('rgba(40, 40, 40, 0.2)');
    quad(middle-120, lposy+25, middle+120, lposy+25, middle+200, lposy+120, middle-200, lposy+120);
}

function pointHorizontalShape(s, point){
    //calculate position of point
    s.pt = point.time - time;
    s.x = s.pt * density + middle;
    s.y = lposy

    s2 = indicatorOnPoint(point);

    s.linex0 = s.x;
    s.liney0 = s2.linestart + lposy;
    s.linex1 = s.x;
    s.liney1 = s2.lineend + lposy;
}

function translateHorizontalShape(s, point){
    translate(middle, lposy);
    translate(s.pt*density, -15*point.pos);
}
