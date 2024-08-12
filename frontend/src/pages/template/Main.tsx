import { Box, Typography, useTheme } from "@mui/material"
import React from "react"

type serverProp = {
    children : React.ReactNode
}
const Main = ({children}:serverProp) => {
    const theme = useTheme()
    return (
        <Box sx={{
            flexGrow: 1,
            mt:`${theme.primaryAppBar.height}px`,
            height:`calc(100vh - ${theme.primaryAppBar.height}px)`,
            overflow: 'hidden'
        }}>
            {children}
        </Box>
    )
}

export default Main