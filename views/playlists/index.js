const remote = require('electron').remote

//Audio tag, I have only, so I do not use class or id
const hear = document.querySelector('audio')
//Buttons on mediaplayer
const pauseButton = document.querySelector('.pause-button')


//State of a whole program
const state = remote.getGlobal('state')

function init(){
    //Set song and time on which song is playing
    if(state.songName){
        hear.src = state.songName
        console.log(state)
        console.log(state.playedTime)
        hear.currentTime = state.playedTime
    }
    //Start song or set pause
    if(state.isSongPlaying){
        playMusic()
    }else{
        pauseMusic()
    }
}

//Play music can be used by play button, by system play button, etc.
//So it is being used when audio tag starts playing or when user presses play button
function playMusic(){
    state.isSongPlaying = true
    pauseButton.style.cssText = "background-image: url('../../assets/pause.svg');"
    hear.play()
}

//Pause music can be used by pause button, by system pause button, etc.
//So it is being used when audio tag is being stopped or when user presses pause button
function pauseMusic(){
    state.isSongPlaying = false
    pauseButton.style.cssText = "background-image: url('../../assets/play.svg');"
    hear.pause()
}


init()