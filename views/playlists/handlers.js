//-------------------------------------------------------------------------------
// It is the file, which contains different listeners and functions like onClick, etc.
//-------------------------------------------------------------------------------

//Dropdown stuff
const dropdownButton = document.querySelector('.change-playlist-button')
const currentPlaylistName = document.querySelector('.current-playlist-name')
const dropdownMenu = document.querySelector('.dropdown')


//Show dropdown if it ain't visible now and in the other way hides it
function changeDropdownVisibility(){
    const isdropdownVisible = dropdownMenu.style.display == "block"
    if(isdropdownVisible){
        dropdownMenu.style.display = "none"
        dropdownButton.style.cssText = "transform: rotate(0deg);"
    }else{
        dropdownMenu.style.display = "block"
        dropdownButton.style.cssText = "transform: rotate(180deg);"
    }
}
dropdownButton.onclick = changeDropdownVisibility
currentPlaylistName.onclick = changeDropdownVisibility


//Pause music when music pauses in audio element.
//First of all it's for case when user press pause button on keyborad or kind of.
hear.addEventListener('pause', pauseMusic)

//Starts to play music when music starts to play in audio element.
//First of all it's for case when user press play button on keyborad or kind of.
hear.addEventListener('play', playMusic)

//If music played it ain't playing now or if music didn't played it is playing now
pauseButton.onclick = () => {
    if(state.isSongPlaying){
        pauseMusic()
    }else{
        playMusic()
    }
    state.isSongPlaying = !state.isSongPlaying
}