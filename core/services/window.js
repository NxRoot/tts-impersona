const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const isDev = require("electron-is-dev");
const url = require('url')

function createWindow(title, windowPath, config, raw) {

    let mainWindow = new BrowserWindow({
        title: title || "",
        show: false,
        resizable:false,
        maximizable: false,
        transparent: false,
        backgroundColor: 'black',
        width: 600,
        height: 400,
        minWidth: 600,
        minHeight: 400,
        
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            webSecurity: false,
            devTools: true
        },
        ...(config ? config : {})
    });

    mainWindow.setBackgroundColor("black")

    const startUrl = isDev && !raw
        ? 'http://localhost:3000'
        : url.format({
            pathname: windowPath,
            protocol: 'file:',
            slashes: true,
        });

    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', () => mainWindow = null);

    return mainWindow

}

module.exports = createWindow