
//Main configuration (behaviour)
let config = {
    multiplicationFactor: 1.11, //change resolution to achieve better antialiasing 
    record: false,      //swith recording on - uses capture.js and works under Chrome only. As a result webm file will be saved
    test: false,         //swith testing on - displays smaller and more visible circle of timeline, time goes faster
    filename: "test",   //filename to save movie
    timeStart: 0,       //start time in seconds - should be left as 0
    timeEnd: 1300,      //1314 end time in senconds - how long timeline will be animated
    density: 6,         //unused
    screenResolutionX: 1280,    //horizontal resolution of movie/canvas
    screenResolutionY: 720,     //vertical resolution of movie/canvas
    defaultTextSize: 16,         //default size of font of text on timeline 
    defaultSubtitleSize: 20,    //default size of font of subtitle
    defaultSubtitle2Size: 30,    //default size of font of subtitle
    speed: 0.001,               //speed of movement without recording - 0.001 means - 1 second animation / 1 second realtime, 0.1 means - 100 seconds of animation in one secont of realtime
    bigCircleRadius: 750,       //radius of big circle 
    bigCirclePosY: 1400,        //center of big circle
    subtitlePos: 700,           //position of subtitles
    subtitle2Pos: 600,           //position of subtitles
    fps: 10,          //number of frames per seconds on movie
    format: 'transparentpng',   //output file format: png-set of pngs, webm - webm, transparentpng - set of pngs with transparent background
    mainShape: "lineleft"         //shape of launcher available options: circle, hline, sin, curved, lineleft
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
    { timeh: 0, timem: 0, times: 0, title: "2020", pos: 1 },
    { timeh: 0, timem: 1, times: 4, title: "RODZINA", pos: 1 },
    { timeh: 0, timem: 1, times: 20, title: "Stefanek", pos: -1 },
    { timeh: 0, timem: 3, times: 3, title: "serdeczność", pos: -1 },
    { timeh: 0, timem: 3, times: 38, title: "Mikołaj spożywa", pos: 1 },
    { timeh: 0, timem: 4, times: 06, title: "różne takie", pos: -1 },
    { timeh: 0, timem: 4, times: 45, title: "religia", pos: -1 },
    { timeh: 0, timem: 5, times: 24, title: "AKTYWNOŚCI", pos: 1 },
    { timeh: 0, timem: 5, times: 24, title: "prace", pos: -1 },
    { timeh: 0, timem: 5, times: 58, title: "zabawy", pos: -1 },
    { timeh: 0, timem: 8, times: 54, title: "nad wodą", pos: -1 },
    { timeh: 0, timem: 9, times: 22, title: "twórczość i występy", pos: 1 },
    { timeh: 0, timem: 12, times: 40, title: "gwiazdka", pos: -1 },
    { timeh: 0, timem: 13, times: 44, title: "SPORT", pos: 1 },
    { timeh: 0, timem: 14, times: 25, title: "piłka nożna", pos: -1 },
    { timeh: 0, timem: 15, times: 08, title: "siatkówka", pos: -1 },
    { timeh: 0, timem: 15, times: 49, title: "hulajnoga", pos: -1 },
    { timeh: 0, timem: 16, times: 41, title: "rowery", pos: -1 },
    { timeh: 0, timem: 17, times: 36, title: "sport motorowy", pos: -1 },
    { timeh: 0, timem: 18, times: 12, title: "SZALEŃSTWA", pos: 1 },
    { timeh: 0, timem: 20, times: 52, title: "KONIEC", pos: 1 },
    { timeh: 0, timem: 21, times: 07, title: "Retrospekcje", pos: -1 },
    { timeh: 0, timem: 22, times: 05, title: "Prawdziwy koniec", pos: 1 }
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
    { start: [0, 0, 24], end: [0, 0, 90], text: "Rok 2020 rozpoczął się jeszcze w listopadzie 2019" },        
    { start: [0, 3, 56], end: [0, 3, 58], text: "Jestem kucharzeeeem" },        
    { start: [0, 4, 59], end: [0, 5, 08], text: "Promocja Franka na ministranta" },        
    { start: [0, 6, 18], end: [0, 6, 32], text: "Domowe, covidowe zajęcia parkour" },        
    { start: [0, 7, 58], end: [0, 8, 03], text: "Widzisz, nie utopiłeś się!" },        
    { start: [0, 11, 45], end: [0, 11, 59], text: "Wschód słońca" },        
    { start: [0, 18, 43], end: [0, 18, 55], text: "Piaskownica była obok, ale ziemia - to jest dopiero zabawa" },        
    { start: [0, 21, 58], end: [0, 22, 05], text: "Coś na kształt uderzeń młota w scenie po napisach Avengers End Game" }        
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
    { start: [0, 0, 0], end: [0, 1, 4], text: "The Addams Family Theme song", size: 12 },
    { start: [0, 1, 20], end: [0, 5, 23], text: "Pablopavo i ludziki - Karwoski", size: 12 },
    { start: [0, 5, 23], end: [0, 9, 22], text: "Lao Che - Automaty", size: 12 },
    { start: [0, 9, 22], end: [0, 14, 10], text: "Natalia Przybysz - Krakowski Spleen", size: 12 },
    { start: [0, 14, 13], end: [0, 17, 25], text: "Sanah - Szampan", size: 12 },
    { start: [0, 17, 25], end: [0, 21, 06], text: "Kwiat jabłoni - Dziś późno pójdę spać", size: 12 }        
    ];

