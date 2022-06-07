import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/index';
import reportWebVitals from './reportWebVitals';
import StorageService from './services/storage.service';
import Loading from './components/base/loading';

// const { webFrame } = window.require('electron')
// webFrame.setZoomFactor(0.85)

if ('speechSynthesis' in window) {
    // Speech Synthesis supported 🎉
} else {
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
}

console.log('Creating DOM');

ReactDOM.render(
    StorageService.isReady() ? <App /> : <Loading text="Loading Modules..." />,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const sound: any = document.getElementById('audio');

const rateIn = 0.025
const rateOut = 0.01
const fadeOutSeconds = 154;

sound.volume = 0.0
sound.currentTime = 0

const fadeIn = () => (sound.volume + rateIn <= 1) && (sound.volume += rateIn)
const fadeOut = () => (sound.volume - rateOut >= 0) && (sound.volume -= rateOut)
const restart = () => !(sound.volume - rateOut >= 0) && (sound.currentTime = 0)

setInterval(() => {
    if(localStorage.getItem("music") == "true"){

        if(sound.currentTime >= fadeOutSeconds) fadeOut()  // fadeout
        else if(sound.currentTime >= 0) fadeIn()           // fadein
        restart()                                          // restart loop

    }else {
        sound.volume = 0.0
        sound.currentTime = 0
    }
}, 500);

sound.play()