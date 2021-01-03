//-------------------------------------------------------------------------------
// It is the file, which contains different listeners and functions onClick, etc.
//-------------------------------------------------------------------------------

const dropdownButton = document.querySelector('.change-playlist-button')
const currentPlaylistName = document.querySelector('.current-playlist-name')
const dropdownMenu = document.querySelector('.dropdown')

//Show dropdown if it ain't visible now and in the other way hides it
function changeDropdownVisibility(){
    const isdropdownVisible = dropdownMenu.style.display == "block"
    if(isdropdownVisible){
        dropdownMenu.style.display = "none"
    }else{
        dropdownMenu.style.display = "block"
    }
}

dropdownButton.onclick = changeDropdownVisibility
currentPlaylistName.onclick = changeDropdownVisibility