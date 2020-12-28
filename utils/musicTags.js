const NodeID3 = require('node-id3')
const ID3Writer = require('browser-id3-writer')
const path = require('path');
const fs = require('fs');
const { update } = require('node-id3');

const songBuffer = fs.readFileSync('Green Day - Say Goodbye_(newtopmp3.org).mp3');
const coverBuffer = fs.readFileSync('SvgFileService.png');

const writer = new ID3Writer(songBuffer);
writer.setFrame('TIT2', 'Home')
      .setFrame('TPE1', ['Eminem', '50 Cent'])
      .setFrame('TALB', 'Friday Night Lights')
      .setFrame('TYER', 2004)
      .setFrame('APIC', {
          type: 3,
          data: coverBuffer,
          description: 'Super picture'
      });
writer.addTag();

const taggedSongBuffer = Buffer.from(writer.arrayBuffer);
fs.writeFileSync('song_with_tags.mp3', taggedSongBuffer);


//Return song's tags and name of the song
async function readSongData(songPath){
    let tags = await NodeID3.read(songPath)
    tags.name = getSongName(songPath)
    return tags 
}

//Set different data to song. 
//In the basic way function sets ID3 tags, that works in ID3Writer. 
//Also this function can set music file name, when tag is 'NAME' 
async function writeSongData(songPath, tags){
    const updatedSong = new ID3Writer(fs.readFileSync(songPath));
    const songExtension = getSongExtension(songPath)
    let songName = getSongName(songPath)
    for(let tag in tags){
        if(tag == 'NAME'){
            songName = tags[tag]
        }else{
            console.log(tag)
            updatedSong.setFrame(tag, tags[tag])
            
        }
    }
    updatedSong.addTag()
    //Save file
    saveSong(songPath, songName, songExtension, updatedSong)
}

//Save song data: tags and name. This function remove old version of music
async function saveSong(songPath, songName, songExtension, updatedSong){
    const updatedSongBuffer = Buffer.from(updatedSong.arrayBuffer);
    const fullSongFileName = songName + songExtension
    fs.writeFile(fullSongFileName, updatedSongBuffer, (e)=>{console.log('Success')});
    fs.unlink(songPath, (e) => {console.log('Success')})
}

//Return song name without extension by path to the song
function getSongName(songPath){
    let fileName = songPath.split('\\')[songPath.split('\\').length - 1]
    const songName = path.parse(fileName).name
    return songName
}

//Return song extension by path of this song
function getSongExtension(songPath){
    let fileName = songPath.split('\\')[songPath.split('\\').length - 1]
    songExt = path.parse(fileName).ext
    return songExt
}

module.exports = {readSongData, writeSongData}