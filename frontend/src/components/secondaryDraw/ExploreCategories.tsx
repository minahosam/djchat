import { useEffect } from "react"
import useCrud from "../../hooks/useCrud"
import { Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"
import { MEDIA_URL } from "../../configts"

type category = {
    id:number
    name:string
    description:string
    icon:string
}
const ExploreCategories = () => {
    const theme = useTheme()
    const {isLoading,error,dataCRUD,fetchData} = useCrud<category>([],"category/")
    useEffect(() => {
        fetchData()
    }, [])
    // useEffect(() => {
    //   console.log(dataCRUD)
    // }, [dataCRUD])
    
    return (
        
        <>
            <Box sx={{height:'50px', display: 'flex',  alignItems: 'center', px:2, borderBottom:`1px solid ${theme.palette.divider}`, position:'sticky', top:0, background:theme.palette.background.default}}>
                Explore
            </Box>
            <List sx={{py:0}}>
                {dataCRUD.map((item)=>(
                    <ListItem disablePadding key={item.id} sx={{display:'block'}} dense={true}>
                        <Link to={`${item.name}`} style={{textDecoration: 'none', color:'inherit'}}>
                            <ListItemButton sx={{minHeight:48}}>
                                <ListItemIcon sx={{minWidth:0, justifyContent:'center'}}>
                                    <ListItemAvatar sx={{minWidth:'0px'}}>
                                        <img alt="category icon" src={`${MEDIA_URL}${item.icon}`} style={{width:'25px', height:'25px', display:'block', margin:'auto'}}/>
                                    </ListItemAvatar>
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant="body1" textAlign='start' paddingLeft={1}>
                                    { item.name}
                                </Typography>}/>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    )
}
export default ExploreCategories