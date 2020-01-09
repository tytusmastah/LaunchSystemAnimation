let config = {
    record: false,
    test: true,
    timeStart: 0,
    timeEnd: 1400,
    density: 6,
    screenResolutionX: 1280,
    screenResolutionY: 720,
    defaultTextSize: 8,
    defaultSubtitleSize: 16,
    speed: 0.001,
    bigCircleRadius: 750,
    bigCirclePosY: 1400,
    subtitlePos: 700,
    fps: 10,
}

let cpoints =  [{ time: 0, title: "Start", pos: -1 },
                { time: 10, title: "Skowronki 2020", pos: 1 },
                { time: 50, title: "pierwszy", pos: -1 },
                { time: 400, title: "drugi", pos: -1 },
                { time: 700, title: "To jest długi tekst, trudno się go robi", pos: -1, size: 10 },
                { time: 700, title: "A to druga linia jego", pos: -2, size: 10 },
                { time: 1000, title: "trzeci", pos: 1 },
                { time: 950, title: "czwarty", pos: -1 },
                { time: 1400, title: "Koniec", pos: -1, size: 16 },
                { time: 1500, title: "impos", pos: 1 },
                { timeh: 0, timem: 1, times: 3, title: "czas według godzin", pos: 1 }
    ];

let csubtitles = [
        { start: [0, 0, 0], end: [0, 0, 4], text: "START", size: 12 },
        { start: [0, 0, 10], end: [0, 0, 24], text: "Witajcie" }
    ];