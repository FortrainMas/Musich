let state = {
    isSongPlaying: false
}

//Hidden audio tag
const hear = document.getElementById('listen');
//Music progress bar
const progressBar = document.querySelector('.music-progress-bar')
//Buttons under progress bar
const pauseButton = document.querySelector('.pause-button')

//Pause music can be used by pause button, by system pause button, etc.
//So it is being used when audio tag stops or when you press pause button
function pauseMusic(){
    state.isSongPlaying = false
    pauseButton.style.cssText = "background-image: url('../../assets/play.svg');"
    hear.pause()
}

//Play music can be used by play button, by system play button, etc.
//So it is being used when audio tag stats playing or when you press play button
function playMusic(){
    state.isSongPlaying = true
    pauseButton.style.cssText = "background-image: url('../../assets/pause.svg');"
    hear.play()
}

hear.addEventListener('pause', (e) => {
    pauseMusic()
})

hear.addEventListener('play', ()=>{
    playMusic()
})

//Set the point on the music progress bar, depends on the current time of the music(audio tag)
function setMusicProgress(){
    const progress = 1000 * (hear.currentTime / hear.duration)
    progressBar.value = progress;
}

//Set the current time oof music, depends on the point on the progress bar
function setMusicMoment(){
    const currentTime = (hear.duration * progressBar.value) / 1000
    console.log(`
        Progress: ${progressBar.value}
        CurrentTime: ${currentTime}
        Duration: ${hear.duration}
    `)
    hear.currentTime = currentTime
}

pauseButton.onclick = () => {
    console.log('Stuff')
    const isSongPlaying = state.isSongPlaying
    if(isSongPlaying){
        pauseMusic()
    }else{
        playMusic()
    }
    return 'sfd'
}

progressBar.onchange = () => {
    setMusicMoment()
}

setInterval(setMusicProgress, 500)