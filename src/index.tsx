import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/index';
import reportWebVitals from './reportWebVitals';
import StorageService from './services/storage.service';
import Loader from './components/base/loader';

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
    StorageService.isReady() ? <App /> : <Loader text="Loading Modules..." />,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
