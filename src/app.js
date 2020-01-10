let time = config.timeStart;
let frame = 0;

//Lista punktów specjalnych
let resx = config.screenResolutionX;
let resy = config.screenResolutionY;
let fast = config.speed; //zegar - co ile milisekund jest sekunda :-D
let points = [];
let subs = csubtitles;
let textsize = config.defaultTextSize;

//dlugosc trwania wszystkiego
let alltime = config.timeEnd;
let radius = config.bigCircleRadius; //750;

//let density = config.density; //ilosc pikseli na sekunde
var density;


var cposy = config.bigCirclePosY; //1400; //y srodka kola glownego
console.log("cposy" + cposy);


let saved = false;

var middle = resx / 2; //srodek ekranu
console.log(middle);

if (!config.record){
    fast=fast*5; //faster
}
if (config.test){
    fast=fast*2; //faster
    radius = radius/3;
    cposy = radius*2.5;    
}


//Poniższe może się nada do zapisania animacji jako filmu. 
//https://github.com/spite/ccapture.js/

var capturer;

var canvas;

function setup() {
    console.log("setup");
    canvas = createCanvas(resx, resy);
    smooth();
    density = PI+HALF_PI; // 3/4 of circle
    // sliderSkip= createSlider(1,10,1);
    // sliderDelta = createSlider(1,700,dokl);
    // sliderDokl = createSlider(1,3000, 1);
    // sliderScale = createSlider(1, 200, 50);
    // if (D2) {
    //     setupFT2D();
    // } else {
    //     setupFT3D();
    // };
    cpoints.forEach((point) => {
        if (!point.time) {
            point.time =
                ((point.timeh) ? point.timeh * 60 * 60 : 0) +
                ((point.timem) ? point.timem * 60 : 0) +
                ((point.times) ? point.times : 0);

            console.log(point.timeh, point.timem, point.times, point.time, point.timem * 60 + point.times);
        }
        if (point.time <= config.timeEnd + 2) {
            points.push(point);
        }
    });
    // console.log(points);
    subs.forEach((s) => {
        s.start[3] = s.start[2] + s.start[1] * 60 + s.start[0] * 60 * 60;
        s.end[3] = s.end[2] + s.end[1] * 60 + s.end[0] * 60 * 60;
        if (!s.size) {
            s.size = config.defaultSubtitleSize;
        }
    });
    if (config.record) {
        frameRate(config.fps);
        capturer = new CCapture({
            format: 'webm',
            verbose: false,
            framerate: config.fps,
            name: "test",
            // motionBlurFrames: 0.5,
            quality: 1.0
        });
        capturer.start();
    }
}

var pypec = 3;
/** Funkcja głównej pętli */
function draw() {
    // requestAnimationFrame(draw);


    background(0);

    noFill();
    stroke(128);
    strokeWeight(2.5);
    circle(middle, cposy, radius * 2);
    stroke(255);
    arc(middle, cposy, radius * 2, radius * 2, 0, -HALF_PI);
    strokeWeight(1);
    line(middle, cposy - radius - pypec, middle, cposy - radius + pypec);
    strokeWeight(2);
    stroke(40);
    circle(middle, cposy, radius * 2 - 60);

    if (!config.record || config.test){
        var h = Math.floor(time/60/60);
        var m = Math.floor((time - h*60*60)/60);
        var s = Math.floor(time - h*60*60 - m*60);
        var t = "Time: " + h + ":" + m + ":" + s; 
        stroke(255);
        fill(255);
        textAlign(LEFT, CENTER);
        textSize(20);
        text(t, 0, 20)
    }


    //Subtitle
    strokeWeight(1);
    subs.forEach(s => {

        if (s.start[3] <= time && s.end[3] >= time) {
            var color = 255;
            if (s.end[3] - s.start[3] > 10) {
                // if (s.start[3]==time.toFixed() || s.end[3]==time.toFixed()){
                //     color=80;
                // }
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



    for (var k = 0; k < points.length; k++) {
        var point = points[k];
        textSize(textsize)
        textAlign(CENTER, CENTER);
        var pt = point.time - time;

        var fractionx = sin(pt * density / alltime);
        var fractiony = -cos(pt * density / alltime);

        var x = radius * fractionx;
        var y = radius * fractiony;
        x += middle;
        y += cposy;

        var linex0
        var linex1
        var liney0
        var liney1
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

        //jeszcze nie minięty event
        if (time < point.time) {
            fill(0);
            strokeWeight(1);
            if (point.time - time < 3) {
                stroke(230);
            }

            //punkt
            stroke(230);
            circle(x, y, 8)

            //wypustek na punkcie
            line(linex0, liney0, linex1, liney1);

            //Napisy
            stroke(128);
            fill(255);
            translate(middle, cposy);
            rotate(pt * density / alltime, [radius]);
            translate(0, -radius + (15 * point.pos));
            textSize(textsize);
            if (point.size) {
                textSize(point.size);
            }
            text(point.title, 0, 0)
            resetMatrix();
        } else {
            // a tu jak minął event
            noFill();

            stroke(256);
            strokeWeight(1);
            fill(0);

            //punkt
            circle(x, y, 8);

            //wypustek na punkcie
            line(linex0, liney0, linex1, liney1);
            fill(255);

            //kropka w punkcie
            circle(x, y, 2);

            //tekst
            translate(middle, cposy);
            rotate(pt * density / alltime, [radius]);
            translate(0, -radius + (15 * point.pos));
            textSize(textsize)
            if (point.size) {
                textSize(point.size);
            }
            text(point.title, 0, 0);
            resetMatrix();
        }
    }



    if (time < alltime) {
        if (config.record){
            time = frame / config.fps;
        }else{
            time = millis()*fast + timeMove;
        }
        
        frame++;
        if (config.record){
            capturer.capture(document.getElementById('defaultCanvas0'));
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

var curMouseX = 0;
var timeMove = 0;

function mouseDragged(event) {
    console.log(event);
    if (curMouseX == 0) {
        curMouseX = event.clientX;
    }
    timeMove += (event.layerX - curMouseX);
    time = millis() * fast + timeMove;
    curMouseX = event.layerX;
}