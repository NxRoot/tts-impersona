import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import MotionDiv from '../../base/motionDiv';

function ConsoleItem({ item, noScroll }: any) {

    const itemRef = useRef<HTMLDivElement | null>()

    useEffect(() => {
        if(itemRef && itemRef.current && !noScroll){
            itemRef.current.scrollIntoView({behavior:"smooth"})
        }
    }, [])

    return (
        <MotionDiv start disabled={!noScroll} >
            <Box ref={ref => !noScroll ? itemRef.current = ref : undefined} flexDir="row" display="flex">
                <Text opacity={0.7}> [ Ra ] &nbsp;</Text> {item}
            </Box>
        </MotionDiv>
    );
}

export default ConsoleItem;
