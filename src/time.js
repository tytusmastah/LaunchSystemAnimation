class TimeHandler{
    time; 
    alltime;
    frame; 
    fast; 
    timeMove; 
    curMouseX;

    constructor(){
        this.frame=0;
        this.time=config.timeStart;
        this.alltime=config.timeEnd;
        this.fast = config.speed; 
        this.timeMove = 0;
        this.curMouseX = 0;
    }

    handleTime(){
        if (this.time < this.alltime) {
            //count time during recording
            if (config.record) { 
                this.time = this.frame / config.fps;
                this.frame++;
                capturer.capture(canvas);
                framediv.innerHTML = (Math.floor(time));
            } else { //count time beside of recording
                this.time = millis() * this.fast + this.timeMove; 
            }
        } else {
            if (!saved && config.record) {
                capturer.stop();
                capturer.save();
                saved = true;
            }
        }
    }
}