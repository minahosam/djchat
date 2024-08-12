import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListItemIcon, Typography } from "@mui/material"
import useCrud from "../../hooks/useCrud";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MEDIA_URL } from "../../configts";
import { Opacity } from "@mui/icons-material";

interface Server{
    id:number;
    name:string;
    category:string
    icon:string
}
type props = {
    open: boolean
}
const PopularChannels: React.FC<props> = ({open}) => {
    const {dataCRUD,isLoading,fetchData,error} = useCrud<Server>([],"server/")
    console.log(isLoading)
    useEffect(() => {
      fetchData()
    }, [])
    useEffect(() => {
      console.log(dataCRUD)
    }, [dataCRUD])
    
    
    return (
        <>
            <Box sx={{height:50,p:2,display:"flex",alignItems:"center",flex:"1 1 100%"}}>
                <Typography sx={{display: open ? "block" : "none"}}>
                    Popular
                </Typography>
            </Box>
            <List>
                {dataCRUD.map(item =>(
                    <ListItem key={item.id} disablePadding sx={{display:"block"}} dense={true}>
                        <Link to={`/server/${item.id}`} style={{textDecoration:"none", color:"inherit"}}>
                            <ListItemButton sx={{minHeight:0}}>
                                <ListItemIcon sx={{minHeight:0, justifyContent:"center0"}}>
                                    <ListItemAvatar sx={{minWidth:"50px"}}>
                                        <Avatar alt="server item" src={`${MEDIA_URL}${item.icon}`} />
                                    </ListItemAvatar>
                                </ListItemIcon>
                                <ListItemText 
                                primary={<Typography variant="body2" sx={{fontWeight:700, lineHeight:1.2, textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap"}}>{item.name}</Typography>}
                                // secondary={<Typography variant="body2" sx={{fontWeight:500, lineHeight:1.2, color:"textSecondary"}}>{item.category}</Typography>}
                                sx={{Opacity:open?1:0}} primaryTypographyProps={{sx:{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default PopularChannels