var arclen = 200*config.multiplicationFactor;
var arcradius = 350*config.multiplicationFactor;


class Curved{
    draw() {
        drawCurvedLine();
    }

    point(s, point) {
        pointCurvedLine(s, point);
    }

    translate(s, point){
        translateCurvedLine(s, point);
    }

    subtitle(){
        drawSubtitle();
    }
}


/** Draws line */
function drawCurvedLine(){
    noFill()
    stroke(128);
    stroke(128);
    strokeWeight(2.5);
    line(middle-10, lposy, config.screenResolutionX*multiplicationFactor, lposy);
    // arc(config.screenResolutionX*multiplicationFactor-arclen, lposy-arcradius, arcradius*multiplicationFactor, arcradius*multiplicationFactor, 2*PI, HALF_PI);

    stroke(255);
    line(arclen,lposy,middle, lposy);
    arc(arclen, lposy+arcradius, arcradius * 2, arcradius * 2, -PI, -HALF_PI);
    strokeWeight(2);
    line(middle,lposy - pypec, middle, lposy+pypec);
    strokeWeight(2);
    stroke(128);
    fill('rgba(40, 40, 40, 0.2)');
    quad(middle-120, lposy+25, middle+120, lposy+25, middle+200, lposy+120, middle-200, lposy+120);
}

/** Calculate real position of point on a screen 
 * and indicator
 */
function pointCurvedLine(s, point){
    //calculate position of point
    s.pt = point.time - time.time;
    s.x = s.pt * density + middle;
    s.y = lposy

    if (s.x<arclen){
        s.dx = s.x-arclen;
        s.dy = - sqrt(arcradius*arcradius-(s.dx*s.dx));
        s.y = lposy + arcradius + s.dy;
        // (x/arclen)^2+(y/arclen)^2=1
        // (y/arclen)^2=1-(x/arclen)^2
        // y^2=(1-(x/arclen)^2)*arclen^2
    }
    if (s.x > config.screenResolutionX*multiplicationFactor-arclen){
        s.dx = arclen - (config.screenResolutionX*multiplicationFactor -s.x);
        s.dy = arcradius - sqrt(arcradius*arcradius-(s.dx*s.dx));
        s.y = lposy - s.dy
    }

    s2 = indicatorOnPoint(point);

    s.linex0 = s.x;
    s.liney0 = s.y + s2.linestart;
    s.linex1 = s.x;
    s.liney1 = s2.lineend + s.y;
}

/** translate texts of point */
function translateCurvedLine(s, point){
    if (s.x <= -100){
        translate(-200, -200); 
    }
    else if (s.x<arclen && s.x>-100){    
        translate(s.x,s.y-15*point.pos); //początek układu współrzędnych pod albo nad puktem
        rotate(Math.asin((s.dx)/arcradius)); //przekręcenie tekstu, który będzie wypisany w nowym 0,0
    }
    else if (s.x > config.screenResolutionX*multiplicationFactor-arclen 
        && s.x < config.screenResolutionX*multiplicationFactor+100){
        translate(s.x,s.y-15*point.pos);
        rotate(5*Math.asin((s.dx)/arcradius));
    }
    else if (s.x >= config.screenResolutionX*multiplicationFactor + 100){
        translate(-400, -400);
    }else{
        translate(middle, s.y);
        translate(s.pt*density, -15*point.pos);
    }
}
