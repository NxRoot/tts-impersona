export class TalkingServiceClass {
    client: SpeechSynthesisUtterance;

    constructor() {
        // configure speech client
        this.client = new SpeechSynthesisUtterance();
        // this.client.volume = 1; // From 0 to 1
        // this.client.rate = 1; // From 0.1 to 10
        // this.client.pitch = 2; // From 0 to 2
        return this;
    }
    
    setLang(lang: string) {
        this.client.lang = lang;
    }

    setRate(rate: number) {
        this.client.rate = rate;
    }

    setPitch(pitch: number) {
        this.client.pitch = pitch;
    }

    setVolume(volume: number) {
        this.client.volume = volume;
    }

    setVoice(voice: SpeechSynthesisVoice) {
        this.client.voice = voice;
        this.client.lang = voice.lang;
    }

    getVoices(): SpeechSynthesisVoice[] {
        return window.speechSynthesis.getVoices() as SpeechSynthesisVoice[];
    }

    async speak(text: string) {
        if(text && text !== ""){
            this.client.text = text;
            window.speechSynthesis.speak(this.client);
        }
    }
    
    random(arr: string[]){
        const random = Math.floor(Math.random() * arr.length)
        const text = arr[random]
        this.speak(text)
    }
}

const TalkingService = new TalkingServiceClass();
export default TalkingService;
