
function drawSubtitle() {
    strokeWeight(1);
    subs.forEach(s => {
        if (s.start[3] <= time.time && s.end[3] >= time.time) {
            var color = 255;
            var linecolor = 128;

            //fade-in, fade-out
            if (s.end[3] - s.start[3] > 10) {
                if (s.start[3] + 3 > time.time) {
                    color = ((time.time - s.start[3]) / 3) * 255;
                } else if (s.end[3] - 3 < time.time) {
                    color = ((s.end[3] - time.time) / 3) * 255;
                }
            }

            stroke(linecolor);
            fill(color);
            textSize(s.size*multiplicationFactor);
            textAlign(CENTER, CENTER);
            text(s.text, subtitleXPos, config.subtitlePos*multiplicationFactor);
        };
    });

    if (subs2){
        subs2.forEach(s => {
            if (s.start[3] <= time.time && s.end[3] >= time.time) {
                var col = 255;
                var lcol = 128;
                var c, linecolor;
                var alpha;
                var c2 = col; 

                //fade-in, fade-out
                if (s.end[3] - s.start[3] > 10) {
                    if (s.start[3] + 3 > time.time) {
                        alpha = (100 - ((time.time - s.start[3]) / 3) * 100)/100;
                        c2 = ((time.time - s.start[3])/3)*col; 
                    } else if (s.end[3] - 3 < time.time) {
                        alpha = (100 - ((s.end[3] - time.time) / 3) * 100)/100;
                        c2 = ((s.end[3] - time.time) / 3 ) * col;
                    }
                }
                // if (transparency){ 
                //     c = color(col,col,col,alpha);
                //     linecolor = color(lcol, lcol, lcol, alpha);
                //     console.log("alpha: " + alpha);
                // }else{
                    // console.log("c: " + c2 + " lcol: " + lcol);
                    c = c2;
                    linecolor = lcol;
                // }

                stroke(linecolor);
                fill(c);
                textSize(s.size);
                textAlign(CENTER, CENTER);
                text(s.text, middle, config.subtitle2Pos*multiplicationFactor);
            };
        });
    }
}

function drawTimer() {
    var h = Math.floor(time.time / 60 / 60);
    var m = Math.floor((time.time - h * 60 * 60) / 60);
    var s = Math.floor(time.time - h * 60 * 60 - m * 60);
    // console.log("time: " + time.time);
    var t = "Time: " + h + ":" + m + ":" + s + "  -   " + debugText;
    stroke(255);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(20);
    text(t, 0, 20)

}

function drawPoints() {
    points.forEach((point) => {
        drawPoint(point);
    });
}

function indicatorOnPoint(point){
    s2 = {};
    if (point.pos < 0) {
        s2.linestart = 4*multiplicationFactor;
        s2.lineend = 6*multiplicationFactor;
    } else if (point.pos > 0) {
        s2.linestart = -4*multiplicationFactor;
        s2.lineend = -6*multiplicationFactor;
    } else {
        s2.linestart = -3*multiplicationFactor;
        s2.lineend = -3*multiplicationFactor;
    }
    return s2;
}

function drawPointText(point){
    //point titles
    textAlign(CENTER, CENTER);
    stroke(128);
    fill(255);    
    textSize(point.size);
    text(point.title, 0, 0)
}

function drawPoint(point) {
    if (!point){
        throw {text: "Exeption in drawPoint", point: point};
    }
    var s={};

    method.point(s, point);

    if (!s || s.linex0 == undefined || s.linex0 == null){
        throw {text: "Exception in drawPoint", s: s};
    }


    // switchShape(s, point, pointCircle, pointHorizontalShape, null, pointCurvedLine, null);

    //draw point before
    if (time.time < point.time) {
        fill(0);
        strokeWeight(1*multiplicationFactor);
        stroke(200);
        if (point.time - time.time < 3) {
            stroke(230);
        }
        circle(s.x, s.y, 8*multiplicationFactor); //point itself

        line(s.linex0, s.liney0, s.linex1, s.liney1); //indicator on point



        //switchShape(s, point, translateCircle, translateHorizontalShape, null, translateCurvedLine, null);
        method.translate(s, point);
        
        method.pointTextBefore(point);
        resetMatrix();
    } else {
        //draw point after
        stroke(255);
        strokeWeight(1*multiplicationFactor);
        fill(0);
        circle(s.x, s.y, 8*multiplicationFactor); //point inself

        line(s.linex0, s.liney0, s.linex1, s.liney1); //point indicator

        fill(255);
        circle(s.x, s.y, 2*multiplicationFactor); //dot in a point

        //point titles
        // switchShape(s, point, translateCircle, translateHorizontalShape, null, translateCurvedLine);
        method.translate(s, point);

        method.pointTextAfter(point);
        resetMatrix();
    }
}




class PointHandler{

}
