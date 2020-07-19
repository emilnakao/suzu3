const log = require('electron-log');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const updater = require('./updater');


log.info(process.argv)

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  } else {
    // Handle squirrel event. Avoid calling for updates when install
    if (require('electron-squirrel-startup')) {
      log.info('Squirrel events handle')
      app.quit()
      // Hack because app.quit() is not immediate
      process.exit(0)
    }

    if (process.platform === 'win32') {
      var cmd = process.argv[1]
      if (cmd === '--squirrel-firstrun') {
        log.info('Squirrel first run')
        return
      }
    }

    // Check for updates
    mainWindow.webContents.once("did-frame-finish-load", function (event) {
      log.info('Ready to look for update')
      updater.init()
    })
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  log.info('Closing app')
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});