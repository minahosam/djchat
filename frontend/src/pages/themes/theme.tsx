import { createTheme, responsiveFontSizes } from "@mui/material"

declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar: {
            height: number
        }
        primarywidth: {
            width: number;
            close: number
        }
        secondaryDraw: {
            width: number
        }
    }
    interface ThemeOptions {
        primaryAppBar?: {
            height?: number
        }
        primarywidth?: {
            width?: number
            close?: number
        }
        secondaryDraw?: {
            width?: number
        }
    }
}

export const createMuiTheme = () => {
    let theme = createTheme({
        typography: {
            fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
        },
        primaryAppBar: {
            height: 50
        },
        primarywidth: {
            width: 240,
            close: 70
        },
        secondaryDraw: {
            width: 240
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    color: "default",
                    elevation: 0
                }
            }
        }
    })
    theme = responsiveFontSizes(theme)
    return theme
}
export default createMuiTheme