import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import { LocalContext } from "../../../../app";

export default function ConsoleDrawerVoices({ voices, onClick, onBack }: { voices: SpeechSynthesisVoice[], onClick?: (voice: SpeechSynthesisVoice) => void, onBack?: any}){

    const context = useContext(LocalContext);
    const replacer = (str: string) => str.replace("Microsoft", "").replace("Desktop", "")

    return (
            <Box onContextMenu={onBack} borderTop="1px solid rgba(100,100,100,0.3)" overflow="scroll" display="flex" flexDir="column" justifyContent="flex-start" h="100%">
                <Box flex="1" >
                {
                    voices.map((voice, index: number) => {
                        const selected = context.settings.voice === voice.name

                        return (
                            <Box key={index} onClick={() => onClick?.(voice)} _hover={{opacity: 0.8}} px="4" py="2.5" color="gray.100" opacity={selected ? 1 : 0.5} bg={selected ? "rgba(0,0,0,0.3)" : undefined} cursor="pointer" display="flex" justifyContent="space-between" alignItems="center" >
                                <Box fontSize={15} className="nowrap" mr="10px">{replacer(voice.name)}</Box>
                                <Box fontSize={13}>{voice.lang.replace("en-","")}</Box>
                            </Box>
                        )
                    })
                }
                </Box>
                <Box flex="0">
                    <Text p="4" fontSize={13} color="gray" textAlign="center" borderTop="1px solid rgba(100,100,100,0.3)" mt="2">Powered By <b>NxRoot</b></Text>
                </Box>
            </Box>
    )
}