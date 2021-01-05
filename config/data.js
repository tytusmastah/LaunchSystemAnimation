
//Main configuration (behaviour)
let config = {
    multiplicationFactor:1, //change resolution to achieve better antialiasing 
    record: false,      //swith recording on - uses capture.js and works under Chrome only. As a result webm file will be saved
    test: false,         //swith testing on - displays smaller and more visible circle of timeline, time goes faster
    filename: "test",   //filename to save movie
    timeStart: 0,       //start time in seconds - should be left as 0
    timeEnd: 1400,      //end time in senconds - how long timeline will be animated
    density: 6,         //unused
    screenResolutionX: 1280,    //horizontal resolution of movie/canvas
    screenResolutionY: 720,     //vertical resolution of movie/canvas
    defaultTextSize: 8,         //default size of font of text on timeline 
    defaultSubtitleSize: 16,    //default size of font of subtitle
    speed: 0.001,               //speed of movement without recording - 0.001 means - 1 second animation / 1 second realtime, 0.1 means - 100 seconds of animation in one secont of realtime
    bigCircleRadius: 750,       //radius of big circle 
    bigCirclePosY: 1400,        //center of big circle
    subtitlePos: 700,           //position of subtitles
    fps: 10,                    //number of frames per seconds on movie
    format: 'png',              //output file format: webm - webm, png - set of pngs with transparent background
    mainShape: "circle"         //shape of launcher available options: circle, hline, sin, curved
}


/**
 * List of points on timeline
 * Parameters: 
 *  time - position in seconds, if unset timeh, timem and times is used
 *  timeh - position in hours
 *  timem - position in minutes
 *  times - position in seconds
 *  pos - position of text. -1 means above circle, 1 - below. -2 - above -1 and so on. 
 *  size - size of font (if not set - default will be used)
 *  title - title of point on timeline
 */
let cpoints =  [{ time: 0, title: "START", pos: -1 },
                { time: 10, title: "Title of point 1", pos: 1 },
                { time: 50, title: "Another title above", pos: -1 },
                { time: 400, title: "Again - above", pos: -1 },
                { time: 700, title: "Second line of long text", pos: -1, size: 10 },
                { time: 700, title: "First line of long text", pos: -2, size: 10 },
                { time: 1000, title: "Text below", pos: 1 },
                { time: 950, title: "Text above", pos: -1 },
                { time: 1400, title: "Finish point, bigger", pos: -1, size: 16 },
                { time: 1500, title: "Unavailable point", pos: 1 },
                { timeh: 0, timem: 1, times: 3, title: "Time set to 0:01:03", pos: 1 }
    ];

/**
 * List of subtitles
 * parameters: 
 *  start - table with hour, minutes and seconds of start
 *  end - as above - for end. 
 *  size - size of font of subtitle
 *  text - text of subtitle
 */    
let csubtitles = [
        { start: [0, 0, 0], end: [0, 0, 4], text: "Instant message (<10 sek)", size: 12 },
        { start: [0, 0, 10], end: [0, 0, 24], text: "Faded message (>10 sek)" }
    ];

/**
 * Second list of subtitles
 * parameters: 
 *  start - table with hour, minutes and seconds of start
 *  end - as above - for end. 
 *  size - size of font of subtitle
 *  text - text of subtitle
 */    
let csubtitles2 = [
    { start: [0, 0, 24], end: [0, 0, 61], text: "see scubtitles" },        
    { start: [0, 3, 56], end: [0, 3, 58], text: "Jestem kucharzeeeem" }       
];