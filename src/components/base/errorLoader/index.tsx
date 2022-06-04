import React from "react"
import { Box } from "@chakra-ui/react"
import styles from "./index.module.css"

export default function ErrorLoader(props: any){
    return(
        <div className={styles.loader} {...props}>
            <h2>ERROR</h2>
            <Box fontWeight="200" mb="10">
                {props.text ? props.text : null}
            </Box>
            <Box fontWeight="200" color="gray">
                {props.info ? props.info : null}
            </Box>
        </div>
    )
}