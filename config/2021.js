
//Main configuration (behaviour)
let config = {
    multiplicationFactor: 2, //change resolution to achieve better antialiasing 
    record: true,      //swith recording on - uses capture.js and works under Chrome only. As a result webm file will be saved
    test: false,         //swith testing on - displays smaller and more visible circle of timeline, time goes faster
    filename: "2021launcher",   //filename to save movie
    timeStart: 0,       //start time in seconds - should be left as 0
    timeEnd: 1250,      //1314 end time in senconds - how long timeline will be animated
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
    { timeh: 0, timem: 0, times: 0, title: "2021", pos: 1 },
    { timeh: 0, timem: 0, times: 13, title: "PLANETY", pos: 1 },
    { timeh: 0, timem: 0, times: 170, title: "Motoryzacja", pos: -1 },
    { timeh: 0, timem: 0, times: 195, title: "Hulajnoga", pos: 1 },
    { timeh: 0, timem: 0, times: 229, title: "ODLOT", pos: 1 },
    { timeh: 0, timem: 0, times: 408, title: "Alinka", pos: 1 },
    { timeh: 0, timem: 0, times: 495, title: "MYDŁO", pos: 1 },
    { timeh: 0, timem: 0, times: 595, title: "Śnieg", pos: -1 },
    { timeh: 0, timem: 0, times: 659, title: "Sen", pos: -1 },
    { timeh: 0, timem: 0, times: 670, title: "DANCE", pos: 1 },
    { timeh: 0, timem: 0, times: 803, title: "Rowery", pos: -1 },
    { timeh: 0, timem: 0, times: 876, title: "POMARAŃCZA", pos: -1 },
    { timeh: 0, timem: 0, times: 1124, title: "Wydarzenia", pos: -1 },
    { timeh: 0, timem: 0, times: 1179, title: "Retrospekcje", pos: -1 },
    { timeh: 0, timem: 0, times: 1250, title: "KONIEC", pos: -1 },
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
        {start: [0, 4, 27], end: [0, 4, 35], text:"Reakcja Heleny na prezent"},
        { start: [0, 5, 17], end: [0, 5, 27], text: "Lila jest zafascynowana NinjaWarrior" },        
        { start: [0, 9, 33], end: [0, 9, 38], text: "Krabik i krewetki z Bałtyku" },        
        { start: [0, 15, 9], end: [0, 15, 13], text: "Jak coś narysować - to cykl filmów Heleny na YT" },        
        { start: [0, 16, 1], end: [0, 16, 9], text: "Wybrał ten sam samochód, co Wojtek" },        
        { start: [0, 16, 33], end: [0, 16, 43], text: "Mikołaj potrafi bawić się czymkolwiek" },        
     
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
    { start: [0, 0, 0], end: [0, 3, 49], text: "Małe ciała niebieskie - NutkoSfera", size: 12 },
    { start: [0, 3, 49], end: [0, 8, 15], text: "Paragwaj - Lech Janerka", size: 12 },
    { start: [0, 8, 15], end: [0, 10, 57], text: "Mydło, gąbka, trochę wody - Bobasy TV", size: 12 },
    { start: [0, 11, 6], end: [0, 14, 35], text: "Dance Monkey - Tones and I", size: 12 },
    { start: [0, 14, 35], end: [0, 17,33], text: "Pomarańcza Paola - Jarzynki i przyjaciele", size: 12 },
    { start: [0, 17,33], end:[0, 20,50], text: "I Ciebie też, bardzo - Męskie Granie Orkiestra 2021", size: 12 }
    ];

