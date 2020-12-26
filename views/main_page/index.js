let state = {
    isSongPlaying: false
}

const hear = document.getElementById('listen');
const pauseButton = document.querySelector('.pause-button')
pauseButton.onclick = onPauseButton


function pauseMusic(){
    state.isSongPlaying = false
    pauseButton.style.cssText = "background-image: url('../../assets/play.svg');"
    hear.pause()
}

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


function onPauseButton(){
    console.log('Stuff')
    const isSongPlaying = state.isSongPlaying
    if(isSongPlaying){
        pauseMusic()
    }else{
        playMusic()
    }
    return 'sfd'
}
