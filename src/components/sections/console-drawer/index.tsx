import React, { useContext, useState } from "react";
import DrawerSimple from "../../base/drawerSimple";
import { LocalContext } from "../../../app";
import ConsoleDrawerVoices from "./voices";
import ConsoleDrawerSettings from "./settings";

export default function ConsoleDrawer({ show, onClose, onItemClick, onChange }: any){

    const context = useContext(LocalContext);
    const voices: SpeechSynthesisVoice[] = context.voices.filter(voice => voice.lang.toLocaleLowerCase().includes("en-"));
    const [page, setPage] = useState<any>("home")

    function onClick(voice: SpeechSynthesisVoice){
        goHome()
        onItemClick?.(voice)
    }

    function _onClose(){
        goHome()
        onClose?.()
    }

    function goHome(){
        setPage("home")
    }

    function renderContent(){
        switch(page){
            case "home": return <ConsoleDrawerSettings onVoices={() => setPage("voice")} onBack={_onClose} onChange={onChange}/>;
            case "voice": return <ConsoleDrawerVoices voices={voices} onClick={onClick} onBack={goHome}/>;
        }
    }

    return (
        <DrawerSimple show={show} size='sm' onClose={page==="home" ? _onClose : goHome} title={page == "home" ? "Voice Settings" : "Select a voice"}>
            { renderContent() }
        </DrawerSimple>
    )
}