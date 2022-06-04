import React from "react";
import { FormControl, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from "@chakra-ui/react";

export default function SliderInput({ onChange, value, label ,min, max, step }: any){
    return (
        <FormControl px="4" mt="3" pr="5">
            <Box color="gray.100" fontSize={15} justifyContent="space-between" display="flex" alignItems="center" opacity={0.7}>
                {label} <Text>{value}</Text>
            </Box>
            <Slider aria-label='slider-ex-1' defaultValue={value} max={max} min={min} step={step} onChange={onChange}>
                <SliderTrack bg="black" h="1" >
                    <SliderFilledTrack bg="#295888"/>
                </SliderTrack>
                <SliderThumb bg="#295888" w="3" h="3" borderWidth="1px" borderColor="black" borderRadius="10" zIndex={0}/>
            </Slider>
        </FormControl>
    )
}