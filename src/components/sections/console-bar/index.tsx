import React from "react";
import { Box } from "@chakra-ui/react";

export default function ConsoleBar({ children }: any){
    return (
        <Box flex="0" position="relative"  p="2.5"  display="flex" justifyContent="flex-start" alignItems="center" shadow="2xl" borderTop="1px solid rgb(0 0 0 / 60%)" bg="gray.800">
            {children}
        </Box>
    )
}