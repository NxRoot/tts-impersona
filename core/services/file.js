const fs = require("fs");
const path = require("path");

const check = /^\s*[\r\n]/gm

class FileService {

    constructor(path){
        this.path = path
        return this
    }

    exists(){
        try {
            if (fs.existsSync(this.path)) {
                return true
            }
        } catch(err) {
            console.log(err)
        }
        return false
    }

    parse(){
        if(this.exists(this.path)) {
            const file = this.read(this.path)
            const data = file.data.replace(check, "").split("\n")
            return { data, path: this.path }
        } 
        return null
    }

    readJSON(){
        if(this.exists(this.path)) {
            const file = this.read(this.path)
            return JSON.parse(file.data)
        } 
        return null
    }

    read = (path) => {
        if(this.exists(path || this.path)) {
            this.data = fs.readFileSync(path || this.path, 'utf8');
        }
        return this
    }
   
    write = (data, path) => {
        fs.writeFileSync(path || this.path, data);
        return this
    }
}

module.exports = FileService
