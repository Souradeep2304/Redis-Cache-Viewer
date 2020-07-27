'use strict';

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        
        width: 1100,
        height: 800,
        icon: __dirname + '/favicon.ico',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });
    
    
    mainWindow.maximize();

    // and load the index.html of the app.
    // mainWindow.loadFile('index.html');
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'frontend.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Removing the Menu Bar.
    mainWindow.setMenu(null);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    app.quit();
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("connect", function (event, arg) {
    // alert(arg);
    console.log(`Received the Event: ${arg}`);
});



