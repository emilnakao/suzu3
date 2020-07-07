const log = require('log-to-file');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const updater = require('./updater');


log(process.argv, 'suzu3.log')

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
      log('Squirrel events handle', 'suzu3.log')
      app.quit()
      // Hack because app.quit() is not immediate
      process.exit(0)
    }

    if (process.platform === 'win32') {
      var cmd = process.argv[1]
      if (cmd === '--squirrel-firstrun') {
        log('Squirrel first run', 'suzu3.log')
        return
      }
    }

    // Check for updates
    mainWindow.webContents.once("did-frame-finish-load", function (event) {
      log('Ready to look for update', 'suzu3.log')
      updater.init()
    })
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  log('Closing app', 'suzu3.log')
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});