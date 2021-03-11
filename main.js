// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const express = require('express')
const $ = require('jquery')
const ExpressLogger = require('leekslazylogger-express');

function createWindow () {
  runthefuckingapi();
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })

  setInterval(() => {
    mainWindow.reload();
  }, 100000);

  function runthefuckingapi() {
    const log = new ExpressLogger({
        name: 'Spigot shitter 4000 is online',
    });
    const app = express();
    
    app.use(log.express());
    
    app.get('/', (req, res) => {
      res.send('Fuck off. Your supposed to send be shit. oh and wrong place ;) Use /v1/post/bedwars')
    })
    
    app.get('/bw', (req, res) => {
      if (req.query.key === "habibi") {
        mainWindow.webContents.executeJavaScript("Number($('.downloadCount dd').text().replace(',',''))")
        .then(result => 
          res.send("" + result)
          );
      } else {
        res.send("fuck off u nigger. go suck a big fat black cock. 403")
      }
    })
    
    app.listen(8080, () => {
      console.log(`spigot shit is now listening on port 8080`)
    })
    }

  // and load the index.html of the app.
  mainWindow.loadURL('https://www.spigotmc.org/resources/screaming-bedwars-1-9-1-16.63714/');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.