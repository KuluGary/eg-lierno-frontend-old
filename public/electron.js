const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

const log = require('electron-log');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    minWidth: 640,
    minHeight: 480,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // mainWindow.removeMenu()
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  })
}

function sendStatus(text) {
  log.info(text);
  if (mainWindow) {
    mainWindow.webContents.send('message', text);
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

autoUpdater.on('error', (ev, err) => {
  mainWindow.webContents.send(err)
})

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

setTimeout(function() {
  log.info('starting update check');
  autoUpdater.checkForUpdates()  
}, 1000);