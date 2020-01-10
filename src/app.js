//copy from config to globals
let resx = config.screenResolutionX;
let resy = config.screenResolutionY;
var cposy = config.bigCirclePosY; //1400; //y srodka kola glownego
let fast = config.speed;
let alltime = config.timeEnd;
let radius = config.bigCircleRadius;
let subs = csubtitles;

//initialization of globals
let time = config.timeStart;
let frame = 0;
let points = []; //filtered list of points on timeline
let saved = false;


var pypec = 3;
var middle = resx / 2; //middle of screen
var capturer;
var density;
var curMouseX = 0;
var timeMove = 0;




function setup() {
    createCanvas(resx, resy);
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

    //configure points
    cpoints.forEach((point) => {
        if (!point.time) {
            point.time =
                ((point.timeh) ? point.timeh * 60 * 60 : 0) +
                ((point.timem) ? point.timem * 60 : 0) +
                ((point.times) ? point.times : 0);
        }
        if (!point.size){
            point.size = config.defaultTextSize;
        }
        if (point.time <= config.timeEnd + 2) {
            points.push(point);
        }
    });

    //configure subtitles
    subs.forEach((s) => {
        s.start[3] = s.start[2] + s.start[1] * 60 + s.start[0] * 60 * 60;
        s.end[3] = s.end[2] + s.end[1] * 60 + s.end[0] * 60 * 60;
        if (!s.size) {
            s.size = config.defaultSubtitleSize;
        }
    });

    //configure capture to movie
    if (config.record) {
        frameRate(config.fps);
        capturer = new CCapture({
            format: 'webm',
            verbose: false,
            framerate: config.fps,
            name: config.filename,
            // motionBlurFrames: 0.5,
            quality: 1.0
        });
        capturer.start();
    }
}


function drawBigCircle() {
    noFill();
    stroke(128);
    strokeWeight(2.5);
    circle(middle, cposy, radius * 2); //main circle
    stroke(255);
    arc(middle, cposy, radius * 2, radius * 2, 0, -HALF_PI); //passed time arc
    strokeWeight(1);
    line(middle, cposy - radius - pypec, middle, cposy - radius + pypec);  //border of passed time
    strokeWeight(2);
    stroke(40);
    circle(middle, cposy, radius * 2 - 60); //big circle in a middle
}

function drawSubitile() {
    strokeWeight(1);
    subs.forEach(s => {
        if (s.start[3] <= time && s.end[3] >= time) {
            var color = 255;

            //fade-in, fade-out
            if (s.end[3] - s.start[3] > 10) {
                if (s.start[3] + 3 > time) {
                    color = ((time - s.start[3]) / 3) * 255;
                } else if (s.end[3] - 3 < time) {
                    color = ((s.end[3] - time) / 3) * 255;
                }
            }


            stroke(color);
            fill(color);
            textSize(s.size);
            textAlign(CENTER, CENTER);
            text(s.text, middle, config.subtitlePos);
        };
    });
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
        drawPoint(point)
    });
}

function drawPoint(point) {
    textAlign(CENTER, CENTER);


    //calculate position of point
    var pt = point.time - time; //position of point in relation to current time
    var fractionx = sin(pt * density / alltime); //rotation of point X
    var fractiony = -cos(pt * density / alltime); //rotation of point Y
    var x = radius * fractionx; //position X on a circle of point
    var y = radius * fractiony; //position Y on a circle of point

    x += middle;
    y += cposy;

    //calculate position of indicator on point
    var linex0, linex1, liney0, liney1
    if (point.pos < 0) {
        linestart = 4;
        lineend = 6;
    } else if (point.pos > 0) {
        linestart = -4;
        lineend = -6;
    } else {
        linestart = 0;
        lineend = 0;
    }
    linex0 = (radius + linestart) * fractionx + middle;
    liney0 = (radius + linestart) * fractiony + cposy;
    linex1 = (radius + lineend) * fractionx + middle;
    liney1 = (radius + lineend) * fractiony + cposy;


    //draw point before
    if (time < point.time) {
        fill(0);
        strokeWeight(1);
        stroke(200);
        if (point.time - time < 3) {
            stroke(230);
        }
        circle(x, y, 8); //point itself

        line(linex0, liney0, linex1, liney1); //indicator on point

        //point titles
        stroke(128);
        fill(255);
        translate(middle, cposy);
        rotate(pt * density / alltime, [radius]);
        translate(0, -radius + (15 * point.pos));
        textSize(point.size);
        text(point.title, 0, 0)
        resetMatrix();
    } else {
        //draw point after
        stroke(255);
        strokeWeight(1);
        fill(0);
        circle(x, y, 8); //point inself

        line(linex0, liney0, linex1, liney1); //point indicator

        fill(255);
        circle(x, y, 2); //dot in a point

        //point titles
        translate(middle, cposy);
        rotate(pt * density / alltime, [radius]);
        translate(0, -radius + (15 * point.pos));
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
            capturer.capture(document.getElementById('defaultCanvas0'));
        } else { //count time beside of recording
            time = millis() * fast + timeMove;
            console.log(time.toFixed());
        }
        console.log(time.toFixed());
    } else {
        if (!saved && config.record) {
            capturer.stop();
            capturer.save();
            saved = true;
        }
    }
}

function draw() {
    background(0);
    if (!config.record || config.test) {
        drawTimer();
    }
    drawBigCircle();
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
    timeMove += (event.layerX - curMouseX);
    time = millis() * fast + timeMove;
    curMouseX = event.layerX;
}