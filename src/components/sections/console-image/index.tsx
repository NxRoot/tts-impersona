import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { LocalContext } from "../../../app";
import MotionDiv from "../../base/motionDiv";
import ImageService from "../../../services/image.service";

export default function ConsoleImage({ text }: any){
    const context = useContext(LocalContext);
    const [curr, setCurr] = useState<string | null>(null)
    const [full, setFull] = useState<boolean>(false)

    const update = useCallback(() => {
        const img = ImageService.find(context.tts.images, text)
        if(img) setCurr(img.path)
    }, [text])

    useEffect(update, [text, update])

    const normal = {
        width: "180px",
        height: "100px",
        bottom: "4.7rem",
        right: "1rem",
        borderRadius: 5
    }

    const fullscreen = {
        bottom: "3.7rem",
        right: "0rem",
        top: "0rem",
        left: "0rem",
    }

    return (
        <MotionDiv start>
            <Box onClick={() => setFull(!full)} cursor="pointer" opacity={full ? 0.3 : 0.7} _hover={{opacity: full ? 0.25 : 0.5}} flex="1" {...(full ? fullscreen : normal)}  overflow="hidden" pos="absolute" bg="rgb(0 0 0 / 100%)" display="flex">
                {curr && <Image src={"file://" + curr} width="100%" height="100%"></Image>}
            </Box>
        </MotionDiv>
     
    )
}