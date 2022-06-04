import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}
  
const theme = extendTheme({
    config,
    components: {
        Modal: {
            baseStyle: (props: any) => ({
                dialog: {
                    shadow: "0 0 10px 0 rgba(10, 10, 10, 1)",
                    bg: "rgb(29,29,29,0.98)",
                }
            })
        },
        Input: {
            baseStyle: {
                field: {
                    bg: "#0000002e",
                    borderColor: "transparent",
                    borderWidth: 1,
                    borderStyle: 'solid',
                    transition: "none",
                    padding: "0.4rem 0.75rem !important",
                    _hover: {
                        borderColor: "#292828",
                        borderWidth: 1,
                        borderStyle: 'solid'
                    }
                }
            }
        },
        Drawer: {
            baseStyle: (props: any) => ({
                fontSize: "14px",
                dialog: {
                  bg: "gray.800",
                }
            })
        },
        Switch: {
            baseStyle: {
                track: {
                    _checked: {
                        bg: "#295888",
                    }
                }
            }
        },
        Checkbox: {
            baseStyle: {
                control: {
                    p: 1,
                    _checked: {
                        bg: "#295888",
                        borderColor: "#295888"
                    }
                },
                icon: {
                    color: "white"
                }
            }
        }
    },
})

export default theme