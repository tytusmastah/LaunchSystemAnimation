# LaunchSystemAnimation

This simple code displays animation of Launch system like on SpaceX movies on YT.   

This code can save movie with such animation which can be added later to any movie with a movie composition application like Cinelerra. 

## Controls
- Animation start automaticaly and works from time 0 to the defined end. 
- If capture is switched off (see Configuration) there are some additional functionalities: 
    - timer is displayed
    - dragging mouse will move time back and forward. In this mode it's possible to go back before start and after defined end. 
    - double click moves to starting point

## Important info
During the recording - ensure, that your browser has zoom set to 100%. If zoom is more than 100% the resolution of a movie will be bigger and the processing will be significantly slower. Nevertheless making zoom less than 100% wont change neither resolution, nor performance. 


## Transparency
If you need obtain a transparency then use config.format : 'transparencypng' and use the result of png files to create mov file, ie: ```ffmpeg -framerate 10 -i %07d.png -vcodec png z.mov```

## Antialiasing
The best antialiasing results are achieved by multiplication dimension by 2 and reducing the result movie with command:
```ffmpeg -framerate 10 -i %07d.png -vf scale=1280x720 -vcodec png z.mov```

## Configuration
See comments in `config/data.js` file

## Example

![Example of output](imgs/screenshoot.png)
