import React, { useContext, useState } from 'react';
import {ReactComponent as IconPlay} from '../assets/icons/play.svg';
import {ReactComponent as IconPause} from '../assets/icons/pause.svg';
import styles from './index.module.css';
import { LocalContext } from '../app';
import logo from '../assets/icons/logo.svg';
import { Box, Button, Checkbox, Menu, MenuButton,  MenuGroup, MenuItem,  MenuList,  Text } from '@chakra-ui/react';
import Interval from '../components/base/interval';
import { RandomService } from '../services/random.service';
import StorageService from '../services/storage.service';
import ConsoleItem from '../components/sections/console-item';
import ConsolePanel from '../components/sections/console-panel';
import ConsoleBar from '../components/sections/console-bar';
import ConsoleDrawer from '../components/sections/console-drawer';
import ConsoleImage from '../components/sections/console-image';

const { remote } = window.require('electron');
const logger = remote.require('./logger');
const test = remote.require('./test');

function ConsolePage() {
    const context = useContext(LocalContext);
    const [playing, setPlaying] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [image, setImage] = useState('')
    const [complex, setComplex] = useState<any>(context.settings.complex)
    const [enableImages, setEnableImages] = useState<any>(context.settings.enableImages)
    const [enableMusic, setEnableMusic] = useState<any>(context.settings.enableMusic)
    const [consoleItems, setConsoleItems] = useState<any[]>([])

    const [wordList, setWordList] = useState<any[]>([...new Set([
        ...(complex === true ? context.tts.extraction : []), 
        ...context.tts.wordlist.data
    ])])
   
    let tt: any = null

    function setSetting(key: string, value: any) {
        StorageService.set(key, value);
        (context.settings as any)[key] = value;
    }

    function speakRandom() {
        if(!window.speechSynthesis.speaking){
            const result = RandomService.getRandom(wordList, true, complex ? context.tts.sentences : '', 1)
            setImage(result.toLowerCase())
            printConsole(result.toLowerCase())
            return(result.toLowerCase())
        }
    }

    function printConsole(value: any, initial?: boolean){
        context.talk.setPitch(context.settings.pitch)
        context.talk.setRate(context.settings.rate)
        context.talk.setVolume(context.settings.volume)
        context.talk.speak(value)

        if(initial){
            setConsoleItems([...consoleItems, value])
        }
        
        logger.log('tts', `Ra: ${value}`);
    }

    function toggleComplex({target: { checked }}: any){
        if(checked){
            if(context.tts.extraction){
                const arr = [...new Set([...context.tts.extraction, ...context.tts.wordlist.data])]
                setWordList(arr)
            }
        }else{
            setWordList(context.tts.wordlist.data)
        }
        setSetting('complex', checked)
        setComplex(checked)
    }

    function toggleMusic({target: { checked }}: any){
        setSetting('music', checked)
        setEnableMusic(checked)
    }

    function toggleImages({target: { checked }}: any){
        setSetting('images', checked)
        setEnableImages(checked)
    }

    function play(){
        clearInterval(tt)
        setFirstLoad(false)
        setConsoleItems([])
        setPlaying(!playing)
        window.speechSynthesis.pause();
        window.speechSynthesis.cancel();
    }

    function startBulk(tick: number){

        let go = false

        const messages = [
            "Welcome traveller!",
            "This is a communication channel!",
            "When you are ready to start you'r adventure!",
            "Press play!"
        ]

        if(!window.speechSynthesis.speaking){
            printConsole(messages[tick], true); 
            go = true
        }

        if(tick >= messages.length) setFirstLoad(false)

        return go
    }


    function renderItems(items: any[], first?: boolean) {
        return items.map((item: any, index: any) => {
            const length = items.length-1
            const filter = first ? index === length : index !== length
            return filter && <ConsoleItem key={index + "_" + first} item={item} noScroll={first}/>
        })
    }

    function onClickItem(voice: SpeechSynthesisVoice) {
        setSetting('voice', voice.name);
        context.talk.setVoice(voice);
    }

    const IconPlaying = playing ? IconPause : IconPlay
  
    return (
        <Box className={styles['App']}>
            <Interval delay={firstLoad && !playing ? 500 : null} onTick={startBulk}/>
            <Interval onFirst delay={playing ? (context.settings.delay || null) : null} initial={consoleItems} onTick={speakRandom}>
                {(items: any) => {
                    return (
                        <Box display="flex" justifyContent="flex-start" flexDir="column" h="100%" minH="100%" >

                            <ConsolePanel> 
                                { renderItems(items) }  
                                {(!firstLoad && enableImages && context.tts.images && context.tts.images.length > 0) && <ConsoleImage text={image}/>}
                            </ConsolePanel>
                           
                            <ConsoleBar>
                                <Box flex="1" pl="2" ml="-1px" mt="-0.5">
                                { renderItems(items, true) }
                                </Box>
                                <Box _hover={{transform: "scale(1.1)"}} mr="1" onClick={play}>
                                    <IconPlaying  cursor="pointer"/>
                                </Box>
                                <Menu offset={[0,20]}>
                                    {({ isOpen }) => (
                                        <>
                                            <MenuButton size="sm" as={Box} mx="2" mr="1" cursor="pointer" style={isOpen ? {transform: "scale(1.1)"} :{}} _hover={isOpen ? {} :{transform: "scale(1.1)"}}>
                                                <img src={logo} className={styles['App-logo']} alt="logo" />
                                            </MenuButton>
                                            <MenuList>
                                                <MenuGroup title='Speech'>
                                                    <MenuItem>
                                                        <Checkbox defaultChecked={context.settings.complex} w="100%" value={complex} onChange={toggleComplex}>
                                                            <Text ml="0.5" fontSize={15}>Enable Complexity</Text>
                                                        </Checkbox>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Checkbox defaultChecked={context.settings.enableImages} w="100%" value={enableImages} onChange={toggleImages}>
                                                            <Text ml="0.5" fontSize={15}>Enable Image Preview</Text>
                                                        </Checkbox>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Checkbox defaultChecked={context.settings.enableMusic} w="100%" value={enableMusic} onChange={toggleMusic}>
                                                            <Text ml="0.5" fontSize={15}>Enable Background Music</Text>
                                                        </Checkbox>
                                                    </MenuItem>
                                                </MenuGroup>
                                            </MenuList>
                                        </>
                                    )}
                                </Menu>
                            </ConsoleBar>
                        </Box>
                    )
                }}
            </Interval>
            <ConsoleDrawer show={drawerOpen} onClose={() => setDrawerOpen(false)} onItemClick={onClickItem} onChange={setSetting}/>
            <Box pos="fixed" top="3" right="3" >
                <Button variant="outline" size="sm"  color="gray" _hover={{color: "white"}} fontSize={12} onClick={() => setDrawerOpen(true)}>Voice</Button>
            </Box>
        </Box>
    );
}

export default ConsolePage;
