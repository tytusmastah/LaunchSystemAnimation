
//Main configuration (behaviour)
let config = {
    record: false,      //swith recording on - uses capture.js and works under Chrome only. As a result webm file will be saved
    test: true,         //swith testing on - displays smaller and more visible circle of timeline, time goes faster
    filename: "2019launcher",   //filename to save movie
    timeStart: 0,       //start time in seconds - should be left as 0
    timeEnd: 1314,      //1314 end time in senconds - how long timeline will be animated
    density: 6,         //unused
    screenResolutionX: 1280,    //horizontal resolution of movie/canvas
    screenResolutionY: 720,     //vertical resolution of movie/canvas
    defaultTextSize: 16,         //default size of font of text on timeline 
    defaultSubtitleSize: 20,    //default size of font of subtitle
    speed: 0.001,               //speed of movement without recording - 0.001 means - 1 second animation / 1 second realtime, 0.1 means - 100 seconds of animation in one secont of realtime
    bigCircleRadius: 750,       //radius of big circle 
    bigCirclePosY: 1400,        //center of big circle
    subtitlePos: 700,           //position of subtitles
    fps: 10,                    //number of frames per seconds on movie
    format: 'transparentpng'    //output file format: png-set of pngs, webm - webm, transparentpng - set of pngs with transparent background
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
let cpoints =  [
    { timeh: 0, timem: 0, times: 0, title: "2019", pos: 1 },
    { timeh: 0, timem: 0, times: 20, title: "Astronautyka", pos: -1 },
    { timeh: 0, timem: 2, times: 28, title: "Biologia", pos: -1 },
    { timeh: 0, timem: 3, times: 5, title: "Dietetyka", pos: 1 },
    { timeh: 0, timem: 4, times: 9, title: "Przemysł rozrywkowy", pos: -1 },
    { timeh: 0, timem: 9, times: 27, title: "Marynistyka", pos: -1 },
    { timeh: 0, timem: 10, times: 56, title: "Mechanika precyzyjna", pos: -1 },
    { timeh: 0, timem: 11, times: 54, title: "Meteorologia", pos: 1 },
    { timeh: 0, timem: 12, times: 29, title: "Nauka o rodzinie", pos: -1 },
    { timeh: 0, timem: 14, times: 54, title: "Komunikacja", pos: -1 },
    { timeh: 0, timem: 17, times: 50, title: "Wychowanie fizyczne", pos: -1 },
    { timeh: 0, timem: 18, times: 54, title: "Internety", pos: -1 },
    { timeh: 0, timem: 20, times: 1, title: "KONIEC", pos: 1 },
    { timeh: 0, timem: 20, times: 21, title: "Retrospekcje", pos: -1 },
    { timeh: 0, timem: 21, times: 54, title: "", pos: 0 }
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
    { start: [0, 0, 20], end: [0, 4, 9], text: "Wanda i banda: Siedem życzeń", size: 12 },
    { start: [0, 6, 45], end: [0, 12, 29], text: "Mike Oldfield: Quicksilver", size: 12 },
    { start: [0, 12, 29], end: [0, 15, 50], text: "Męskie Granie 2019: Sobie i Wam", size: 12 },
    { start: [0, 15, 52], end: [0, 19, 8], text: "Eddie Calvert: Tulips from Amsterdam", size: 12 },
    { start: [0, 20, 10], end: [0, 21, 54], text: "Męskie Granie 2019: Sobie i Wam", size: 12 }
        
    ];
