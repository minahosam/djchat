import { Box, CssBaseline } from "@mui/material"
import PrimaryAppBar from "./template/PrimaryAppBar"
import PrimaryDraw from "./template/PrimaryDraw"
import SecondaryDraw from "./template/SecondryDraw"
import Main from "./template/Main"
import PopularChannels from "../components/primaryDraw/PopularChannels"
import ExploreCategories from "../components/secondaryDraw/ExploreCategories"
import ExploreServer from "../components/mainDraw/ExploreServer"

const Home = () => {
    return ( 
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <PrimaryAppBar />
            <PrimaryDraw>
                < PopularChannels open={false}/>
            </PrimaryDraw>
            <SecondaryDraw>
                <ExploreCategories />
            </SecondaryDraw>
            <Main>
                <ExploreServer/>
            </Main>
        </Box>
    )
}

export default Home