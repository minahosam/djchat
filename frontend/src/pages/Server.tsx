import { Box, CssBaseline } from "@mui/material"
import PrimaryAppBar from "./template/PrimaryAppBar"
import PrimaryDraw from "./template/PrimaryDraw"
import { useEffect } from "react"
import SecondaryDraw from "./template/SecondryDraw"
import Main from "./template/Main"
import MainInterface from "../components/mainDraw/MainInterface"
import ChannelsInterface from "../components/primaryDraw/ChannelsInterface"
import { useNavigate, useParams } from "react-router-dom"
import useCrud from "../hooks/useCrud"
import { Server } from "../@types/Server"
import CategoryInterface from "../components/secondaryDraw/CategoryInterface"

const Home = () => {
    const navigate = useNavigate()
    const { server_id, channel_id } = useParams()
    const { isLoading, dataCRUD, error, fetchData } = useCrud<Server>(
        [], `server/?by_serverId=${server_id}`
    )
    console.log(dataCRUD)
    if (error !== null && error.message === '400') {
        navigate('/')
        return null
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(dataCRUD)
    const isChannel = (): Boolean => {
        if (!channel_id) {
            return true
        }
        return dataCRUD.some((server) =>
            server.channel_server.some(
                (channel) => channel.id === parseInt(channel_id)
            )
        )
    }
    useEffect(() => {
        if (!isChannel()) {
            navigate(`/server/${server_id}`)
        }
    }, [isChannel,channel_id])
    

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <PrimaryAppBar />
            <PrimaryDraw>
                <ChannelsInterface open={true} data={dataCRUD} />
            </PrimaryDraw>
            <SecondaryDraw>
                <CategoryInterface data={dataCRUD} />
            </SecondaryDraw>
            <Main>
                <MainInterface data={dataCRUD}/>
            </Main>
        </Box>
    )
}

export default Home

