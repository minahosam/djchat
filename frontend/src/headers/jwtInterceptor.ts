import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../configts";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = BASE_URL

const useAxiosWithInterceptor = (): AxiosInstance => {
    const jwtAxios = axios.create({ baseURL: API_BASE_URL })
    const navigate = useNavigate()
    jwtAxios.interceptors.response.use(
        (response) => { return response },
        async (error) => {
            const originalError = error.config
            if (error.response?.status === 400) {
                const goRoot = () => navigate('/')
                goRoot()
            }
            if (error.response?.status === 403) {
                const goRoot = () => navigate('/')
                goRoot()
            }
        }
    )
    return jwtAxios
}
export default useAxiosWithInterceptor