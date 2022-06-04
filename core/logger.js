const path = require("path");
const log = require('electron-log');
const isDev = require("electron-is-dev");

const format = d => d.toString().replace(/\w+ (\w+) (\d+) (\d+).*/,'$2-$1-$3') + "";

log.transports.file.level = "info";
log.transports.console.level = isDev;
log.transports.file.format = '[{h}:{i}:{s}.{ms}] {text}';

function send(type, text){
    const date = format(new Date()).toUpperCase()
    log.transports.file.resolvePath = () => path.join(__dirname, `/../logs/${type}-${date}.log`);
    log.info(text)
}

exports.log = send