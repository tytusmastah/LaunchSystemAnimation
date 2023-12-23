
//Main configuration (behaviour)
let config = {
    multiplicationFactor: 2, //change resolution to achieve better antialiasing 
    record: true,      //swith recording on - uses capture.js and works under Chrome only. As a result webm file will be saved
    record: true,      //swith recording on - uses capture.js and works under Chrome only. As a result webm file will be saved
    test: false,         //swith testing on - displays smaller and more visible circle of timeline, time goes faster
    filename: "2022launcher",   //filename to save movie
    timeStart: 0,       //start time in seconds - should be left as 0
    timeEnd: 18*60+52,      //1314 end time in senconds - how long timeline will be animated
    density: 6,         //unused
    screenResolutionX: 1280,    //horizontal resolution of movie/canvas
    screenResolutionY: 720,     //vertical resolution of movie/canvas
    defaultTextSize: 16,         //default size of font of text on timeline 
    defaultSubtitleSize: 20,    //default size of font of subtitle
    defaultSubtitle2Size: 30,    //default size of font of subtitle
    speed: 0.001,               //speed of movement without recording - 0.001 means - 1 second animation / 1 second realtime, 0.1 means - 100 seconds of animation in one secont of realtime
    bigCircleRadius: 250,       //radius of big circle 
    bigCirclePosY: 720,        //center of big circle
    subtitlePos: 700,           //position of subtitles
    subtitlePosX: 1280-125,         //positiion x of subtitles (name of song)
    subtitle2Pos: 700,           //position of subtitles
    fps: 10,          //number of frames per seconds on movie
    format: 'transparentpng',   //output file format: png-set of pngs, webm - webm, transparentpng - set of pngs with transparent background
    mainShape: "arc"         //shape of launcher available options: circle, hline, sin, curved, lineleft, arc
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
    { timeh: 0, timem: 0, times: 0, title: "2022", pos: -1 },
    { timeh: 0, timem: 0, times: 11, title: "Miło", pos: 1 },
    { timeh: 0, timem: 1, times: 24, title: "Prace", pos: 1 },
    { timeh: 0, timem: 1, times: 40, title: "Buzie", pos: 1 },
    { timeh: 0, timem: 2, times: 2, title: "Budowa", pos: 1 },
    { timeh: 0, timem: 2, times: 40, title: "Ćwiczenia", pos: 1 },
    { timeh: 0, timem: 5, times: 30, title: "Jedzenie", pos: 1 },
    { timeh: 0, timem: 7, times: 1, title: "Zabawy", pos: 1 },
    { timeh: 0, timem: 11, times: 12, title: "Gry", pos: 1 },
    { timeh: 0, timem: 11, times: 52, title: "Występy", pos: 1 },
    { timeh: 0, timem: 16, times: 28, title: "Ścinki", pos: 1 },
    { timeh: 0, timem: 18, times: 51, title: "KONIEC", pos: 1 },
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
        {start: [0, 0,35], end: [0, 0,42], text:"Pierwsze urodziny Alinki"},
        {start: [0, 3,28], end: [0, 3,34], text:"Alinka pierwszy raz stanęła"},
        {start: [0, 4,38], end: [0, 4,42], text:"Mikołaj pierwszy raz na rowerze"},
        {start: [0, 8,12], end: [0, 8,16], text:"Kiedy zwykłe układanie kostki jest zbyt banalne"},
        {start: [0, 10,45], end: [0, 10,49], text:"Przyzwyczajony do jazdy w podwójnym wózku na dole"},
        {start: [0, 13,20], end: [0, 13,24], text:"Sztuczka"},
        {start: [0, 16,50], end: [0, 16,57], text:"Nie zdążyłem włączyć nagrywania na czas :("},
        {start: [0, 18,11], end: [0, 18,15], text:"Głupawka"},
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
    { start: [0, 0, 0], end: [0, 3, 33], text: "Sweet Dreams\nEurytmics", size: 12 },
    { start: [0, 3, 36], end: [0, 6, 11], text: "Llama in my living room\nAronChupa, Little Sis Nora", size: 12 },
    { start: [0, 6, 13], end: [0, 8, 44], text: "The Banana Boat Song\nDay-O", size: 12 },
    { start: [0, 8, 44], end: [0, 12, 54], text: "Ile czasu nam potrzeba\nSobel & Sanah (AMF BLEND)", size: 12 },
    { start: [0, 12, 58], end: [0, 17,10], text: "Rapapara\nŁydka grubasa", size: 12 },
    ];

