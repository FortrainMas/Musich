const musicTags = require('../../utils/musicTags')
const remote = require('electron').remote

//Hidden audio tag
const hear = document.getElementById('listen');
//Music progress bar
const progressBar = document.querySelector('.music-progress-bar')
//Buttons under progress bar
const pauseButton = document.querySelector('.pause-button')
const previousButton = document.querySelector('.previous-button')
const nextButton = document.querySelector('.next-button')
//Input field with name of song, they can be changed
const songName = document.querySelector('.song-name')
const songAuthor = document.querySelector('.song-author')


//Initial state in the load of main page view
let state = remote.getGlobal('state')


//Set song to play
async function setSong(){
    const song = state.songName
    hear.src = song
    setSongData(song)
    if(state.isSongPlaying){
        playMusic()
    }else{
        pauseMusic()
    }
}

setSong()

//Set different data like name(name of music file) or different ID3 tags
async function setSongData(songPath)
{
    const tags = await musicTags.readSongData(songPath)
    songName.value = tags.name
    songAuthor.value = tags.artist
}

//Pause music can be used by pause button, by system pause button, etc.
//So it is being used when audio tag stops or when user presses pause button
function pauseMusic(){
    state.isSongPlaying = false
    pauseButton.style.cssText = "background-image: url('../../assets/play.svg');"
    hear.pause()
}

//Play music can be used by play button, by system play button, etc.
//So it is being used when audio tag stats playing or when user presses play button
function playMusic(){
    state.isSongPlaying = true
    pauseButton.style.cssText = "background-image: url('../../assets/pause.svg');"
    hear.play()
}

//Set the point on the music progress bar, depends on the current time of the music(audio tag)
function setMusicProgress(){
    const progress = 1000 * (hear.currentTime / hear.duration)
    progressBar.value = progress;
}

//Set the current time of music, depends on the point on the progress bar
function setMusicMoment(){
    const currentTime = (hear.duration * progressBar.value) / 1000
    console.log(`
        Progress: ${progressBar.value}
        CurrentTime: ${currentTime}
        Duration: ${hear.duration}
    `)
    hear.currentTime = currentTime
}


//Set new song, for that function use another function - setSong
//Replay the playlist in case the song was last and set the next song in the other way
function setNextSong(){
    const newState = remote.getGlobal('state')
    const indexOfCurrentSong = newState.playList.indexOf(newState.songName)
    if(indexOfCurrentSong >= newState.playList.length){
        newState.songName = newState.playList[0]
    }else{
        newState.songName = newState.playList[indexOfCurrentSong + 1]
    }

    setSong()
}

//Set new song, for that function use another function - setSong
//Play the last song in playlist if current song was first or play previous song in playlist
function setPreviousSong(){
    const newState = remote.getGlobal('state')
    const indexOfCurrentSong = newState.playList.indexOf(newState.songName)
    if(indexOfCurrentSong <= 0){
        newState.songName = newState.playList[newState.playList.length - 1]
    }else{
        newState.songName = newState.playList[indexOfCurrentSong - 1]
    }

    setSong()
}

//If music is playing now, pause button stops it, in the other way music starts playing
pauseButton.onclick = () => {
    const isSongPlaying = state.isSongPlaying
    if(isSongPlaying){
        pauseMusic()
    }else{
        playMusic()
    }
}

//Set previous song when user press previous button
previousButton.onclick = () => {
    setPreviousSong()
}

//Set next song when user press next button
nextButton.onclick = () => {
    setNextSong()
}


//Pause music when music pauses in audio element.
//First of all it's for case when user press pause button on keyborad or kind of.
hear.addEventListener('pause', pauseMusic)

//Starts to play music when music starts to play in audio element.
//First of all it's for case when user press play button on keyborad or kind of.
hear.addEventListener('play', playMusic)

//When music ends, programms automaticly set next song
hear.addEventListener('ended', setNextSong)

//When user set music time moment on music progress bar, we have to update music current time in audio tag
progressBar.onchange = () => {
    setMusicMoment()
}

//Every 0,5 seconds programm updates progress bar's progress depends on current music time
setInterval(setMusicProgress, 500)



songName.addEventListener('change', () => {
    const tags = {
        'NAME': songName.value
    }
    const songPath = state.songName
    musicTags.writeSongData(songPath, tags)
})

songAuthor.addEventListener('change', ()=>{
    const tags = {
        'TPE1': [songAuthor.value]
    }
    const songPath = state.songName
    musicTags.writeSongData(songPath, tags)
})