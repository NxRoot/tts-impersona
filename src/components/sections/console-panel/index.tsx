import React from "react";
import { Box } from "@chakra-ui/react";

export default function ConsolePanel({ children }: any){
    return (
        <Box flex="1" p="4" bg="rgb(0 0 0 / 40%)" display="flex" flexDir="column" overflow="scroll" pb="1rem">
            {children}    
        </Box>
    )
}