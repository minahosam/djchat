import { AppBar, Avatar, Box, Drawer, IconButton, ListItemAvatar, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Server } from "../../@types/Server"
import { useParams } from "react-router-dom"
import { MEDIA_URL } from "../../configts"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CategoryInterface from "../secondaryDraw/CategoryInterface";
import { useState,useEffect } from "react";

interface serverChannelProps {
    data: Server[]
}

const MainInterfaceChannels = (props: serverChannelProps) => {
    const { data } = props
    const [sideMenu, setSideMenu] = useState(false)
    const { server_id, channel_id } = useParams()
    const channel_name = data
        ?.find((server) => server.id == Number(server_id))
        ?.channel_server?.find((channel) => channel.id === Number(channel_id))
        ?.name || "home"
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"))
    useEffect(() => {
        if (sideMenu && isSmallScreen) {
            setSideMenu(false)
        }
    }, [isSmallScreen])
    const toggleDrawer = (open: boolean) => (event:React.MouseEvent | React.KeyboardEvent) => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
        ) {
            return ;
        }
        setSideMenu(open)
    }
    const list = () => (
        <Box sx={{paddingTop:`${theme.primaryAppBar.height}px`, minWidth:200}} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <CategoryInterface data={data} />
        </Box>
    )
    return <>
        <AppBar sx={{ backgroundColor: theme.palette.background.default, borderBottom: `1px solid ${theme.palette.divider}` }} color="default" position="sticky" elevation={0}>
            <Toolbar variant="dense" sx={{minHeight:theme.primaryAppBar.height, height:theme.primaryAppBar.height, display:'flex', alignItems:'center'}}>
                <Box sx={{display:{xs:'block', sm:'none'}}}>
                    <ListItemAvatar sx={{minWidth:'40px'}}>
                        <Avatar alt="server_icon" src={`${MEDIA_URL}${data?.[0]?.icon}`} sx={{width:30, height:30}} />
                    </ListItemAvatar>
                </Box>
                <Typography noWrap component='div'>
                    {channel_name}
                </Typography>
                <Box sx={{flexGrow:1}}></Box>
                <Box sx={{display:{xs:'block', sm:'none'}}}>
                    <IconButton color="inherit" onClick={toggleDrawer(true)} edge='end'>
                        <MoreVertIcon />
                    </IconButton>
                </Box>
                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>{list()}</Drawer>
            </Toolbar>
        </AppBar>
    </>
}

export default MainInterfaceChannels