import React, { useContext, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { LocalContext } from "../../../../app";
import SliderInput from "../../../base/slider-input";

export default function ConsoleDrawerSettings({ onVoices, onBack, onChange }: any){
    const context = useContext(LocalContext);
    const voice = context.settings.voice
    const [volume, setVolume] = useState<any>(context.settings.volume);
    const [pitch, setPitch] = useState<any>(context.settings.pitch);
    const [rate, setRate] = useState<any>(context.settings.rate);

    function _onChange(value: any, set: any, key: string){
        set(value)
        onChange?.(key, value)
    }

    return (
        <Box onContextMenu={onBack} borderTop="1px solid rgba(100,100,100,0.3)" overflow="scroll" display="flex" flexDir="column" justifyContent="flex-start" h="100%">
            <Box flex="1" >
                <Box mb="4" borderBottom="1px solid rgba(100,100,100,0.3)" onClick={onVoices} fontSize={15} _hover={{background: "rgba(0,0,0,0.3)", opacity: 0.8}} opacity={0.7} px="4" py="3" color="gray.100"  cursor="pointer" display="flex" justifyContent="flex-start" alignItems="center" >
                    Current: <Text color="yellow.500" ml="2" className="nowrap">{voice}</Text>
                </Box>
                <SliderInput max={1} min={0} step={0.1} label="Volume" value={volume} onChange={(val: any) => _onChange(val, setVolume, "volume")}/>
                <SliderInput max={2} min={0} step={0.1} label="Pitch" value={pitch} onChange={(val: any) => _onChange(val, setPitch, "pitch")}/>
                <SliderInput max={2} min={0} step={0.1} label="Rate" value={rate} onChange={(val: any) => _onChange(val, setRate, "rate")}/>
            </Box>
            <Box flex="0">
                <Text  p="4" fontSize={13} color="gray" textAlign="center" borderTop="1px solid rgba(100,100,100,0.3)">Powered By <b>NxRoot</b></Text>
            </Box>
        </Box>
    )
}