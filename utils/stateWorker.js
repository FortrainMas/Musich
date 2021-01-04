//----------------------------------------------------
// Make some stuff with state
// Basicly it can just load state from hdd or ssd and save state
//----------------------------------------------------

const fs = require('fs')
const { parse } = require('path')
//Path to local state json file that is being used by another functions
const path = '../state.json'

//Save state to state.json file. It should be used when user quit the programm
function saveState(state){
    console.log(state.songName)
    const normalizedState = {
        songName: state.songName,
        isSongPlaying: state.isSongPlaying,
        playedTime: state.playedTime,
        playlist: state.playlist
    }
    state = JSON.stringify(normalizedState)
    fs.writeFile('state.json', state, (e) => {console.log(e)})
}

//Load state from state.json file. And return parsed version of this file, just object
function loadState(){
    const state = fs.readFileSync('state.json')
    return JSON.parse(state)
}

module.exports = {saveState, loadState}