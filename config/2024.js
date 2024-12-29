
//Main configuration (behaviour)
let config = {
    multiplicationFactor: 1, //change resolution to achieve better antialiasing 
    record: false,      //swith recording on - uses capture.js and works under Chrome only. As a result webm file will be saved
    test: true,         //swith testing on - displays smaller and more visible circle of timeline, time goes faster
    filename: "2024launcher",   //filename to save movie
    timeStart: 0,       //start time in seconds - should be left as 0
    timeEnd: 23*60+11,      //1314 end time in senconds - how long timeline will be animated
    density: 6,         //distance beetween points
    screenResolutionX: 1280,    //horizontal resolution of movie/canvas
    screenResolutionY: 720,     //vertical resolution of movie/canvas
    defaultTextSize: 16,         //default size of font of text on timeline 
    defaultSubtitleSize: 20,    //default size of font of subtitle
    defaultSubtitle2Size: 30,    //default size of font of subtitle
    speed: 0.001,               //speed of movement without recording - 0.001 means - 1 second animation / 1 second realtime, 0.1 means - 100 seconds of animation in one secont of realtime
    bigCircleRadius: 250,       //radius of big circle 
    bigCirclePosY: 720,        //center of big circle
    subtitlePos: 700,           //position of subtitles
    subtitlePosX: 125,         //positiion x of subtitles (name of song)
    subtitle2Pos: 700,           //position of subtitles
    fps: 10,          //number of frames per seconds on movie
    format: 'transparentpng',   //output file format: png-set of pngs, webm - webm, transparentpng - set of pngs with transparent background
    mainShape: "bulk2"         //shape of launcher available options: circle, hline, sin, curved, lineleft, arc, bulk of sinusoids
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
 *  title - title of point on timeline eaaaaaaaaaaaaaaaaaaaacccccccccccn
 */
let cpoints =  [
    { timeh: 0, timem: 0, times: 0, title: "2023", pos: -1 },
    { timeh: 0, timem: 0, times: 17, title: "Razem", pos: 1 },
    { timeh: 0, timem: 1, times: 2, title: "Przebieranki", pos: 1 },
    { timeh: 0, timem: 1, times: 49, title: "Występy", pos: 1 },
    { timeh: 0, timem: 1, times: 55, title: "śpiew", pos: -1 },
    { timeh: 0, timem: 3, times: 8, title: "sztuki", pos: 1 },
    { timeh: 0, timem: 3, times: 27, title: "taniec", pos: -1 },
    { timeh: 0, timem: 4, times: 32, title: "performance", pos: -1 },

    { timeh: 0, timem: 5, times: 44, title: "Pojazdy", pos: 1 },
    { timeh: 0, timem: 7, times: 6, title: "Jedzenie", pos: 1 },
    { timeh: 0, timem: 8, times: 40, title: "Umiejętności", pos: 1 },
    { timeh: 0, timem: 9, times: 36, title: "Walka", pos: 1 },
    { timeh: 0, timem: 12, times: 4, title: "Rowery", pos: 1 },
    { timeh: 0, timem: 13, times: 16, title: "Huśtawki", pos: 1 },
    { timeh: 0, timem: 14, times: 13, title: "karuzele", pos: -1 },
    { timeh: 0, timem: 14, times: 54, title: "Supermoce", pos: 1 },
    { timeh: 0, timem: 16, times: 39, title: "Szaleństwa", pos: 1 },
    { timeh: 0, timem: 17, times: 48, title: "Szczęśliwi", pos: 1 },
    { timeh: 0, timem: 17, times: 48, title: "i piękni", pos: -1 },
    { timeh: 0, timem: 21, times: 2, title: "Z czapy", pos: 1 },
    { timeh: 0, timem: 22, times: 26, title: "Napisy", pos: 1 },
    { timeh: 0, timem: 22, times: 51, title: "Bonusik", pos: -1 },
    { timeh: 0, timem: 23, times: 10, title: "KONIEC", pos: 1 },
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
        {start: [0, 1,30], end: [0, 1,42], text:"Własnoręcznie zbudowany kostium dinozaura"},
        {start: [0, 5,15], end: [0, 5,30], text:"Stefan ze swoim najelpszym kolegą Antkiem"},
        {start: [0, 6,30], end: [0, 6,39], text:"Powrót z Juraty ciuchcią Manix"},
        {start: [0, 22,52], end: [0, 23,5], text:"Impreza w firmie IT"},
        {start: [0, 0,0], end: [0, 0,0], text:""},
        {start: [0, 0,0], end: [0, 0,0], text:""},
        {start: [0, 0,0], end: [0, 0,0], text:""},
        {start: [0, 0,0], end: [0, 0,0], text:""},
        {start: [0, 0,0], end: [0, 0,0], text:""},
        {start: [0, 0,0], end: [0, 0,0], text:""},
        {start: [0, 0,0], end: [0, 0,0], text:""},
        {start: [0, 0,0], end: [0, 0,0], text:""},
        {start: [0, 0,0], end: [0, 0,0], text:""},
        {start: [0, 0,0], end: [0, 0,0], text:""},
        {start: [0, 0,0], end: [0, 0,0], text:""},
     
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
    { start: [0, 0, 0], end: [0, 2, 1], text: "Omm\nLech Janerka", size: 12 },
    { start: [0, 5, 47], end: [0, 7, 12], text: "Omm\nLech Janerka", size: 12 },
    { start: [0, 7, 12], end: [0, 10, 39], text: "Całkiem nowa bajka\nKaśka Sochacka, Mrozu, Artur Rojek, \nBrodka, Ralph Kamiński, Bedoes2115, Sokół", size: 11 },
    { start: [0, 10, 39], end: [0, 14, 54], text: "Od nowa\nKwiat Jabłoni", size: 12 },
    { start: [0, 14, 54], end: [0, 18,9], text: "Supermoce\nIgo, Mrozu, Vito Bambino", size: 12 },
    { start: [0, 18, 9], end: [0, 23,10], text: "Wzięli i zamknęli mi klub\nKwiat Jabłoni", size: 12 },
    ];

