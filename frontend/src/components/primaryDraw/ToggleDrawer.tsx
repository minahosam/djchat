import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"
import React from "react"

type props = {
    open: boolean
    handleDrawerOpen: () => void
    handleDrawerClose: () => void
}
const ToggleDrawer: React.FC<props> = ({ open, handleDrawerClose, handleDrawerOpen }) => {
    return (
        <Box sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                {open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
        </Box>
    )
}
export default ToggleDrawer