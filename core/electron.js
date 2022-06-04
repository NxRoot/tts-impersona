require('dotenv').config();
const path = require("path");
const { app , ipcMain } = require("electron");
const os = require('os');

const isMac = os.platform() === "darwin";
const isWindows = os.platform() === "win32";

const addonPath = isMac ? "/../../../.." : ""
const appPath = process.execPath

// services
const FileService = require('./services/file');
const createWindow = require('./services/window');

const wordsPath = path.join(__dirname, '/config/wordlist.txt')
const sentencesPath = path.join(__dirname, '/config/sentences.txt')

const customWordsPath = path.join(appPath, (addonPath + '/config/wordlist.txt'))
const customSentencesPath = path.join(appPath, (addonPath + '/config/sentences.txt'))
const customSettingsPath = path.join(appPath, (addonPath + '/config/settings.json'))

// read startup files
const wordlist = new FileService(wordsPath).parse()
const sentences = new FileService(sentencesPath).read()

// read custom files
const customWordlist = new FileService(customWordsPath).parse()
const customSentences = new FileService(customSentencesPath).read()
const customSettings = new FileService(customSettingsPath).readJSON()

let mainWindow;

function main(){
    // create renderer
    mainWindow = createWindow("Text-To-Speech - Impersona", path.join(__dirname, '/../build/index.html'))

    mainWindow.on('ready-to-show', function() {
        mainWindow.show();
        mainWindow.focus()
    });
}

app.on('window-all-closed', function () {
    clean()
    app.quit()
})

app.on('ready', main);

app.on('activate', () => {
    if (mainWindow === null) {
        main()
    }
});


/* ----------------------------------- main code starts here ------------------------------------- */

function clean(){
    ipcMain.removeAllListeners("get_save_data")
}

function extractList(text){
    const regex = /[!"#”“$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const words = text.replace(regex, ' ').trim().split(/\s*\b\s*/)
    return [...new Set([...words])].filter(e => e !== undefined && e.length > 1)
}

// return save data to renderer
ipcMain.on('get_save_data', (event, args) => {

    const list = extractList(sentences.data)
    let customList = null

    const custom = customWordlist && customWordlist.data && customWordlist.data.length > 0 && customSentences.data

    if(custom){
        customList = extractList(customSentences.data)
    }

    mainWindow.webContents.send('tts_data', { 
        appPath,
        customWordsPath,
        wordlist: custom ? customWordlist : wordlist, 
        sentences: custom ? customSentences.path : sentences.path,
        extraction: custom && customList ? customList : list,
        ...(custom && customSettings ? { customSettings } : {}),
    })
});
