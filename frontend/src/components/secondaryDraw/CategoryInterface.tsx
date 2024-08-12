import useCrud from "../../hooks/useCrud"
import { Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import { MEDIA_URL } from "../../configts"
import { Server } from "../../@types/Server"

// type category = {
//     id:number
//     name:string
//     description:string
//     icon:string
// }
interface ChannelProps {
    data: Server[]
}
const CategoryInterface: React.FC<ChannelProps> = ({ data }) => {
    // console.log(data)
    // const server_name = data?.[0]?.name ?? 'server'
    const server_name = data[0] ? data[0].name : 'server'
    const theme = useTheme()
    const {server_id} = useParams()
    // const serverId = data[0].id
    // console.log(server_id)
    // const {isLoading,error,dataCRUD,fetchData} = useCrud<category>([],"category/")
    // useEffect(() => {
    //     fetchData()
    // }, [])
    // useEffect(() => {
    //   console.log(dataCRUD)
    // }, [dataCRUD])

    return (

        <>
            <Box sx={{ height: '50px', display: 'flex', alignItems: 'center', px: 2, borderBottom: `1px solid ${theme.palette.divider}`, position: 'sticky', top: 0, background: theme.palette.background.default }}>
                <Typography variant="body1" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{server_name}</Typography>
            </Box>
            <List sx={{ py: 0 }}>
                {data.flatMap((obj) =>
                    obj.channel_server.map((item) => (
                        <ListItem disablePadding key={item.id} sx={{ display: 'block' }} dense={true}>
                            <Link to={`/server/${server_id}/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemButton sx={{ minHeight: 48 }}>
                                    <ListItemText primary={<Typography variant="body1" textAlign='start' paddingLeft={1}>
                                        {item.name}
                                    </Typography>} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))
                )}
            </List>
        </>
    )
}
export default CategoryInterface