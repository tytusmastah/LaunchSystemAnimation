# LaunchSystemAnimation

This simple code displays animation of Launch system like on SpaceX movies on YT.   

This code can save movie with such animation which can be added later to any movie with a movie composition application like Cinelerra. 

## Controls
- Animation start automaticaly and works from time 0 to the defined end. 
- If capture is switch off (see Configuration) there are some additional functionalities: 
    - timer is displayed
    - dragging mouse will move time back and forward. In this mode it's possible to go back before start and after defined end. 
    - double click moves to starting point

## Important info
During the recording - ensure, that your browser has zoom set to 100%. If zoom is more than 100% the resolution of a movie will be bigger and the processing will be significantly slower. Nevertheless making zoom less than 100% wont change neither resolution, nor performance. 


## Configuration
See comments in `config/data.js` file

## Example

![Example of output](imgs/screenshoot.png)
