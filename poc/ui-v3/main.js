'use strict';

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain,Menu } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
let connectWindow;
function createWindow() {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        
        width: 1100,
        height: 800,
        icon: __dirname + '/favicon.ico',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        },
        show: false
  
        
    });
  
    

    // and load the index.html of the app.
    // mainWindow.loadFile('index.html');
    
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'welcome.html'),
        protocol: 'file:',
        slashes: true
    }))
  
    mainWindow.maximize();
    // Removing the Menu Bar.
    mainWindow.setMenu(null);
    mainWindow.webContents.on('did-finish-load', () => {
        /// then close the loading screen window and show the main window
        if (loadingScreen) {
          loadingScreen.close();
        }
        if (connectWindow) {
          connectWindow.close();
        }
        mainWindow.show();
      });
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
}


function createConnectWindow() {

  // Create the browser window.
  connectWindow = new BrowserWindow({
      
      width: 1100,
      height: 800,
      icon: __dirname + '/favicon.ico',
      webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          nodeIntegration: true,
          enableRemoteModule: true
      },
      show: false

      
  });

  

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html');
  
  connectWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'frontend.html'),
      protocol: 'file:',
      slashes: true
  }))

  connectWindow.maximize();
  // Removing the Menu Bar.
  connectWindow.setMenu(null);
  connectWindow.webContents.on('did-finish-load', () => {
      /// then close the loading screen window and show the main window
      if (mainWindow) {
        mainWindow.close();
      }
      connectWindow.show();
    });
  //Open the DevTools.
  //mainWindow.webContents.openDevTools()
}


// creating a loading screen 
let loadingScreen;
const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow(
    Object.assign({
      /// define width and height for the window
      width: 600,
      height:300,
      /// remove the window frame, so it will become a frameless window
      frame: false,
      icon: __dirname + '/favicon.ico',
      /// and set the transparency, to remove any window background color
      transparent: true
    })
  );
  loadingScreen.setResizable(false);
  loadingScreen.loadURL(
    'file://' + __dirname + '/loading.html'
  );
  loadingScreen.on('closed', () => (loadingScreen = null));
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
};

// menu bar
const welcomemenuBar = () => {
const template = [
  {
     label: 'File',
     submenu: [
        { 
            label: 'Connect to Redis', 
            click(){ 
              createConnectWindow();
              connectmenuBar();
            }
        },
        {
          type: 'separator'
        },
        {
           role: 'close', label:'Exit'
        }
     ]
  }
]


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
}

const connectmenuBar = () => {
  const template = [
    {
       label: 'File',
       submenu: [
          { 
              label: 'About', 
              click(){ 
                createWindow();
                welcomemenuBar();
              }
          },
          {
            type: 'separator'
          },
          {
             role: 'close', label:'Exit'
          }
       ]
    }
  ]
  
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  }




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

    createLoadingScreen();

    setTimeout(() => {
        createWindow();
        welcomemenuBar();
      }, 2000);
});

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



