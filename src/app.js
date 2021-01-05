//copy from config to globals
let multiplicationFactor = config.multiplicationFactor?config.multiplicationFactor:1;
let resx = config.screenResolutionX*multiplicationFactor;
let resy = config.screenResolutionY*multiplicationFactor;
var cposy = config.bigCirclePosY*multiplicationFactor; //1400; //y srodka kola glownego
var lposy = 650*multiplicationFactor;
let fast = config.speed;
let alltime = config.timeEnd;
let radius = config.bigCircleRadius*multiplicationFactor;
let subs = csubtitles;
let subs2 = csubtitles2;

//initialization of globals
let time = config.timeStart;
let frame = 0;
let points = []; //filtered list of points on timeline
let saved = false;
let started = false;
let transparency = (config.format=='transparentpng');
let format = ((config.format=='webm')?"webm":"png");



var pypec = 3*multiplicationFactor;
var middle = resx / 2; //middle of screen
var capturer;
var density;
var curMouseX = 0;
var timeMove = 0;

var canvas;
var framesdiv;




function setup() {
    console.log("Setup");
    createCanvas(resx, resy);
    console.log("Canvas created");
    density = PI + HALF_PI; // 3/4 of circle

    //set Font
    textFont("Arial");

    //increase speed if not recording
    if (!config.record) {
        fast = fast * 5; //faster
    }
    if (config.test) {
        fast = fast * 2; //faster
        radius = radius / 3;
        cposy = radius * 2.5;
    }

    console.log("Setup points");
    //configure points
    cpoints.forEach((point) => {
        if (!point.time) {
            point.time =
                ((point.timeh) ? point.timeh * 60 * 60 : 0) +
                ((point.timem) ? point.timem * 60 : 0) +
                ((point.times) ? point.times : 0);
        }
        if (!point.size){
            point.size = config.defaultTextSize*multiplicationFactor;
        }
        if (point.time <= config.timeEnd + 2) {
            points.push(point);
        }
    });

    console.log("Setup subtitles");
    //configure subtitles
    subs.forEach((s) => {
        s.start[3] = s.start[2] + s.start[1] * 60 + s.start[0] * 60 * 60;
        s.end[3] = s.end[2] + s.end[1] * 60 + s.end[0] * 60 * 60;
        if (!s.size) {
            s.size = config.defaultSubtitleSize*multiplicationFactor;
        }
    });

    //configure second subtitles
    if (subs2){
        subs2.forEach((s) => {
            s.start[3] = s.start[2] + s.start[1] * 60 + s.start[0] * 60 * 60;
            s.end[3] = s.end[2] + s.end[1] * 60 + s.end[0] * 60 * 60;
            if (!s.size) {
                s.size = config.defaultSubtitle2Size*multiplicationFactor;
            }
        });
    }


    //configure capture to movie
    if (config.record) {
        canvas = document.getElementById('defaultCanvas0')
        framediv = document.getElementById('frames');
        console.log("Setup recording");
        frameRate(config.fps);
        capturer = new CCapture({
            format: format,
            verbose: false,
            framerate: config.fps,
            name: config.filename,
            // motionBlurFrames: 0.5,
            quality: 100.0
        });
    }
    console.log("Finish setup");
}

function switchShape(a, b, c, h, s, cv){

    if (!config.mainShape){
        c(a,b);
        return;
    }
    switch(config.mainShape){
        case "circle": c(a,b);
            break;
        case "hline": h(a,b);
            break;
        case "sin" : s(a,b);
            break;
        case "curved" : cv(a,b);
            break;
    }
}

function drawMainLine(){
    switchShape(null, null, drawBigCircle, drawHorizontalLine, null, drawCurvedLine);
}


function drawSubitile() {
    strokeWeight(1);
    subs.forEach(s => {
        if (s.start[3] <= time && s.end[3] >= time) {
            var color = 255;
            var linecolor = 128;

            //fade-in, fade-out
            if (s.end[3] - s.start[3] > 10) {
                if (s.start[3] + 3 > time) {
                    color = ((time - s.start[3]) / 3) * 255;
                } else if (s.end[3] - 3 < time) {
                    color = ((s.end[3] - time) / 3) * 255;
                }
            }

            stroke(linecolor);
            fill(color);
            textSize(s.size*multiplicationFactor);
            textAlign(CENTER, CENTER);
            text(s.text, middle, config.subtitlePos*multiplicationFactor);
        };
    });

    if (subs2){
        subs2.forEach(s => {
            if (s.start[3] <= time && s.end[3] >= time) {
                var col = 255;
                var lcol = 128;
                var c, linecolor;
                var alpha;
                var c2 = col; 

                //fade-in, fade-out
                if (s.end[3] - s.start[3] > 10) {
                    if (s.start[3] + 3 > time) {
                        alpha = (100 - ((time - s.start[3]) / 3) * 100)/100;
                        c2 = ((time - s.start[3])/3)*col; 
                    } else if (s.end[3] - 3 < time) {
                        alpha = (100 - ((s.end[3] - time) / 3) * 100)/100;
                        c2 = ((s.end[3] - time) / 3 ) * col;
                    }
                }
                // if (transparency){ 
                //     c = color(col,col,col,alpha);
                //     linecolor = color(lcol, lcol, lcol, alpha);
                // }else{
                    console.log("c: " + c2 + " lcol: " + lcol);
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
    var h = Math.floor(time / 60 / 60);
    var m = Math.floor((time - h * 60 * 60) / 60);
    var s = Math.floor(time - h * 60 * 60 - m * 60);
    var t = "Time: " + h + ":" + m + ":" + s;
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


function drawPoint(point) {
    textAlign(CENTER, CENTER);
    var s={};

    switchShape(s, point, pointCircle, pointHorizontalShape, null, pointCurvedLine);

    //draw point before
    if (time < point.time) {
        fill(0);
        strokeWeight(1*multiplicationFactor);
        stroke(200);
        if (point.time - time < 3) {
            stroke(230);
        }
        circle(s.x, s.y, 8*multiplicationFactor); //point itself

        line(s.linex0, s.liney0, s.linex1, s.liney1); //indicator on point

        //point titles
        stroke(128);
        fill(255);

        switchShape(s, point, translateCircle, translateHorizontalShape, null, translateCurvedLine);
        
        textSize(point.size);
        text(point.title, 0, 0)
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
        switchShape(s, point, translateCircle, translateHorizontalShape, null, translateCurvedLine);

        stroke(128);
        textSize(point.size);
        text(point.title, 0, 0);
        resetMatrix();
    }
}

function handleTime() {
    if (time < alltime) {
        //count time during recording
        if (config.record) { 
            time = frame / config.fps;
            frame++;
            capturer.capture(canvas);
            framediv.innerHTML = (Math.floor(time));
        } else { //count time beside of recording
            time = millis() * fast + timeMove;
        }
    } else {
        if (!saved && config.record) {
            capturer.stop();
            capturer.save();
            saved = true;
        }
    }
}

function draw() {
    // console.log("draw");
    smooth();
    if (config.record && !started){
        started = true;
        capturer.start();
        console.log("Capturer started");
    }
    if (transparency){
        clear();
    }else{
        background(0);
    }
    // // background(0);
    // if (transparency && !config.test){
    //     // background('rgba(0,0,0,0)');
    // }else if (transparency && config.test){
    //     // background('rgba(0,0,255,0.01)');

    // }

    // background('rgba(0,0,0,1)');
    if (!config.record || config.test) {
        drawTimer();
    }
    drawMainLine();
    drawSubitile();
    drawPoints();
    handleTime();
}


//handle mouse dragging
function mouseDragged(event) {
    // console.log(event);
    if (curMouseX == 0) {
        curMouseX = event.clientX;
    }
    timeMove -= (event.clientX - curMouseX);
    time = millis() * fast + timeMove;
    curMouseX = event.clientX;
}

function mouseReleased(){
    curMouseX = 0;
}

function doubleClicked(){
    curMouseX = 0; 
    timeMove-=time;
}