//copy from config to globals
let multiplicationFactor = config.multiplicationFactor?config.multiplicationFactor:1;
let resx = config.screenResolutionX*multiplicationFactor;
let resy = config.screenResolutionY*multiplicationFactor;
var cposy = config.bigCirclePosY*multiplicationFactor; //1400; //y srodka kola glownego
var lposy = 650*multiplicationFactor;
// let fast = config.speed;
let radius = config.bigCircleRadius*multiplicationFactor;
let subs = csubtitles;
let subs2 = csubtitles2;

//initialization of globals
// let time = config.timeStart;
// let frame = 0;
let points = []; //filtered list of points on timeline
let saved = false;
let started = false;
let transparency = (config.format=='transparentpng');
let format = ((config.format=='webm')?"webm":"png");



var pypec = 3*multiplicationFactor;
var middle = resx / 2; //middle of screen
var capturer;
var density;
// var curMouseX = 0;
// var timeMove = 0;
var debugText =""; //text to display at timer.

var canvas;
var framesdiv;

//Objects: 
var method; 
var time; 



function setup() {
    console.log("Setup");
    createCanvas(resx, resy);
    time = new TimeHandler();
    console.log("TimeHandler", time);
    console.log("Canvas created");
    density = PI + HALF_PI; // 3/4 of circle

    //set Font
    textFont("Arial");

    //increase speed if not recording
    if (!config.record) {
        time.fast = time.fast * 5; //faster
    }
    if (config.test) {
        time.fast = time.fast * 2; //faster
        radius = radius / 3;
        cposy = radius * 2.5;
    }

    switchShape();
    console.log("Chosen method: ", method);

    console.log("Setup points");
    //configure points
    var index = 0; 
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
        point.index = index; 
        index++;
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

function switchShape(a, b, c, h, s, cv, ll){
    if (!config.mainShape){
        method = new BigCircle()
        return;
    }
    switch(config.mainShape){
        case "circle": 
            method = new BigCircle();
            break;
        case "hline": 
            method = new HorizontalLine();
            break;
        case "sin" : 
            method = new Sinusoida();
            break;
        case "curved" : 
            method = new Curved();
            break;
        case "lineleft": 
            method = new LeftLine();
            break;
    }
}

function drawMainLine(){
    // switchShape(null, null, drawBigCircle, drawHorizontalLine, null, drawCurvedLine, null);
    method.draw();
}

//Main loooop
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
        drawTimer(); //only for tests
    }
    method.draw(); //draw main object
    method.subtitle(); //draw subtitles
    drawPoints(); //draw event on object
    time.handleTime(); //next time
}


//handle mouse dragging
function mouseDragged(event) {
    // console.log(event);
    if (time.curMouseX == 0) {
        time.curMouseX = event.clientX;
    }
    time.timeMove -= (event.clientX - time.curMouseX);
    time.time = millis() * time.fast + time.timeMove;
    time.curMouseX = event.clientX;
}

function mouseReleased(){
    time.curMouseX = 0;
}

function doubleClicked(){
    time.curMouseX = 0; 
    time.timeMove-=time.time;
}