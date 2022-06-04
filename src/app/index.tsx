import React, { createContext, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import Loader from '../components/base/loader';
import useInterval from '../hooks/useInterval';
import StorageService from '../services/storage.service';
import TalkingService, { TalkingServiceClass } from '../services/talk.service';
import ErrorLoader from '../components/base/errorLoader';
import theme from './theme';
import useICP from '../hooks/useICP';
import ConsolePage from '../console';

const electron = window.require('electron');
const { ipcRenderer, remote } = electron;
const test = remote.require('./test');

const default_settings = {
    voice: 'Samantha',
    volume: 1,
    pitch: 1,
    rate: 1,
    tension: 2,
    delay: 3000,
    complex: true
};

type LocalContextT = {
    settings: typeof default_settings,
    talk: TalkingServiceClass;
    voices: SpeechSynthesisVoice[];
    tts: any
}

export const LocalContext = createContext({} as LocalContextT);

function App() {

    const maxLoaded = 4
    const talk = TalkingService;
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(0);
    const [text, setText] = useState<string>('Starting...');
    const [tts, setTTS]: any = useState<any>();

    useICP("tts_data", (event: any, args: any) => {
        setTTS(args)
        setLoaded(loaded + 1);
        console.log("ttsdat", args)

        if(args && args.sentences){
            test.Interpreter.read([args.sentences])
            test.InterpreterLong.read([args.sentences])
        }else {
            test.Interpreter.unload()
            test.InterpreterLong.unload()
        }
    })

    const voice = StorageService.get('voice')
    const volume = StorageService.get('volume')
    const pitch = StorageService.get('pitch')
    const rate = StorageService.get('rate')
    const delay = StorageService.get('delay')
    const tension = StorageService.get('tension')
    const complex = StorageService.get('complex')

    const settings = {
        voice: voice || default_settings.voice,
        volume: volume || default_settings.volume,
        pitch: pitch || default_settings.pitch,
        rate: rate || default_settings.rate,
        delay: delay || default_settings.delay,
        tension: tension || default_settings.tension,
        complex: complex !== null ? complex : default_settings.complex,
    };

    const voices = talk.getVoices();

    function loadVoices(){
        setText('Loading voices...');

        if (voices.length !== 0) {
            const findVoice = voices.find((c: any) => c.name === settings.voice);
            if (findVoice) {
                talk.setVolume(settings.volume);
                talk.setPitch(settings.pitch);
                talk.setRate(settings.rate);
                talk.setVoice(findVoice);
                setLoaded(loaded + 1);
            }
        }
    }

    useEffect(() => ipcRenderer.send('get_save_data'), []);

    useInterval(() => {
        loadVoices()
        if(loaded === maxLoaded){
            setLoading(false)
        }
    }, !loading ? null : 700);

    if (loading) return <Loader fade={true} text={text} />;

    if(!loading){
        if(!voices){
            return <ErrorLoader text="Failed to load system voices" />;
        }
    }

    return (
        <LocalContext.Provider value={{ settings, tts, talk, voices }}>
            <ChakraProvider theme={theme}>
                <ConsolePage/>
            </ChakraProvider>
        </LocalContext.Provider>
    );
}

export default App;
