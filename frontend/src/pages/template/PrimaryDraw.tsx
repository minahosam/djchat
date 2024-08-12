import { Box, Typography, useMediaQuery } from "@mui/material"
import { duration, styled, useTheme } from "@mui/material/styles"
import React, { ReactNode, useEffect, useState } from "react"

import ToggleDrawer from "../../components/primaryDraw/ToggleDrawer"
import MuiDrawer from '@mui/material/Drawer'

type Props = {
    children: ReactNode
}
type ChildProps = {
    open: boolean
}
type ChildElement = React.ReactElement<ChildProps>

const PrimaryDraw: React.FC<Props> = ({ children }) => {
    const theme = useTheme()
    const theme500 = useMediaQuery("(max-width:499px)")
    const [open, setOpen] = useState(!theme500)
    useEffect(() => {
        setOpen(!theme500)
    }, [theme500])
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }
    const openedMixin = () => ({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        overflowX: "hidden",
    })
    const closedMixin = () => ({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        overflowX: "hidden",
        width: theme.primarywidth.close,
    })
    const StyledDrawer = styled(MuiDrawer, {})(({ theme, open }) => ({
        width: theme.primarywidth.width,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(),
            "& .MuiDrawer-paper": openedMixin(),
        }),
        ...(!open && {
            ...closedMixin(),
            "& .MuiDrawer-paper": closedMixin(),
        })
    }))



    return (
        <StyledDrawer open={open} variant={theme500 ? "temporary" : "permanent"}
            PaperProps={{
                sx: {
                    mt: `${theme.primaryAppBar.height}px`,
                    height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
                    width: `${theme.primarywidth.width}px`
                }
            }}
        >
            <Box>
                <Box sx={{ position: "absolute", top: 0, right: 0, p: 0, width: open ? "auto" : "100%" }}>
                    <ToggleDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
                </Box>
                {React.Children.map(children, (child) => {
                    return React.isValidElement(child) ? React.cloneElement(child as ChildElement, { open }) : child
                })}
            </Box>
        </StyledDrawer>
    )
}

export default PrimaryDraw