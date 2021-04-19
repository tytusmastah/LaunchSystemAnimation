class LeftLine{

    free; 
    maxheight; 
    mf; 

    constructor(){
        this.free = 30; 
        this.maxheight = config.screenResolutionY - this.free - this.free; 
        this.mf = multiplicationFactor;
    }

    draw() {
        this.drawLineLeft();
    }

    point(s, point) {
        this.pointLineLeft(s, point);
    }

    translate(s, point){
        this.translateLineLeft(s, point);
    }

    subtitle(){
        drawSubtitle();
    }

    pointTextBefore(point){
        this.drawPointTextBefore(point);
    }

    pointTextAfter(point){
        this.drawPointTextAfter(point);
    }


    drawPointTextBefore(point){
        //point titles
        textAlign(LEFT, CENTER);
        stroke(80);
        fill(128);    
        textSize(this.textsize(time.time, point));
        text(point.title, 0, 0)
    }

    drawPointTextAfter(point){
        //point titles
        textAlign(LEFT, CENTER);
        stroke(128);
        fill(255);    
        textSize(this.textsize2(time.time, point));
        text(point.title, 0, 0)
    }


    textsize(curtime, point){
        var offset = curtime - point.time;
        var chg = Math.pow(2, -offset*offset/150)*0.5+0.5; 
        // console.log("point size: " + point.size + " , chg: " + chg);
        return point.size*chg;
    }

    textsize2(curtime, point){
        var offset = curtime - point.time;
        var chg = Math.pow(2, -offset*offset/140)*0.3+0.7; 
        // console.log("point size: " + point.size + " , chg: " + chg);
        return point.size*chg;
    }

    yposition(t, curtime){
        // var chg=time*(1+Math.pow(1.0001, (-(curtime-time)*(curtime-time))));
        var offset = t-curtime; 
        // var chg = time+offset*(Math.pow(2, -offset*offset/2000 - 1)+0.5);
        // var chg = 20*Math.pow(2, -(Math.pow(Math.abs(offset)-100, 2)/1400)); 
        // var chg = 20*Math.pow(2, -offset*offset/1400);
        var chg = offset*Math.pow(2, -offset*offset/1400);
        return this.free+this.maxheight - ((t+chg)*this.maxheight)/time.alltime;
    }




    drawLineLeft(){
        noFill()
        stroke(128);
        strokeWeight(3*this.mf); //TODO - round finish. 
        line(30*this.mf, (config.screenResolutionY - this.free)*this.mf, 30*this.mf, this.free*this.mf);
        stroke(255);
        strokeWeight(5); //TODO - round finish. 
        var transposedpos = this.yposition(time.time, time.time)*this.mf; 
        line(30*this.mf, (config.screenResolutionY - this.free)*this.mf, 30*this.mf, transposedpos);
    }
    
    pointLineLeft(s, point){
        //calculate position of point
        s.pt = point.time - time.time;
        s.x = 30*this.mf;
        s.y = this.yposition(point.time, time.time)*this.mf;

        s2 = indicatorOnPoint(point);

        s.linex0 = s.x + abs(s2.linestart);
        s.liney0 = s.y; //s2.linestart + lposy;
        s.linex1 = s.x + abs(s2.lineend);
        s.liney1 = s.y; //s2.lineend + lposy;
    }

    translateLineLeft(s, point){
        // translate(middle, lposy);
        translate(s.x+10, s.y);
        //Intentionally do nothing
    }
}
