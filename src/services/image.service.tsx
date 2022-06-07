export default class ImageService {

    static randomize(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static find(folders: any[], text: string){
        const dirs: any = folders.filter((f: any) => text.includes(f.dir + ",") || text.includes(f.dir + " "))
        if(dirs.length > 0){
            const dir = dirs[this.randomize(0, dirs.length)]
            if(dir && dir.images && dir.images.length > 0){
                const validImages = dir.images.filter((img: any) => img.valid)
                return validImages[this.randomize(0, validImages.length)]
            }
        }
        return null
    }
}