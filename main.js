const { app, BrowserWindow } = require('electron')
const { saveState, loadState } = require('./utils/stateWorker.js')


function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    focusable:true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  win.maximize()
  win.loadFile('./views/playlists/index.html')
}

app.whenReady().then(createWindow)


global.state = loadState()


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    saveState(global.state)
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
