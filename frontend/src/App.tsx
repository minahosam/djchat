import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from "./pages/Home"
import { ThemeProvider } from "@emotion/react"
import createMuiTheme from "./pages/themes/theme"
import Explore from "./pages/Explore"
import Server from "./pages/Server"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home/>} />
      <Route path="/:categoryName" element={<Explore/>} />
      <Route path="/server/:server_id/:channel_id?" element={<Server/>} />
    </Route>
  )
)

const App:React.FC = () => {
  const theme = createMuiTheme()

  return <ThemeProvider theme={theme}><RouterProvider router={router}/></ThemeProvider>
}

export default App