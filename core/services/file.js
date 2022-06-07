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

    readImageFolder(){
        if(this.exists(this.path)) {
            this.data = fs.readdirSync(this.path, 'utf8').map(dir => {

                const folder = path.join(this.path, dir)
    
                const images = fs.readdirSync(path.join(this.path, dir), 'utf8').map(name => {
                    const valid = !![".jpeg",".jpg",".png"].find(ext => name.toLocaleLowerCase().includes(ext))
                    const key = name.slice(0, name.indexOf("."))
                    return { key, path: path.join(folder, name), valid }
                });
                
                return { dir, images }
            });
        }
        return this
    }
   
    write = (data, path) => {
        fs.writeFileSync(path || this.path, data);
        return this
    }
}

module.exports = FileService
