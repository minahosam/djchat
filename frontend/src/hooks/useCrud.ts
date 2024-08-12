import { useState } from "react"
import useAxiosWithInterceptor from "../headers/jwtInterceptor"
import { BASE_URL } from "../configts"

interface IuseCrud<T> {
    dataCRUD:T[]
    error:Error | null
    isLoading:boolean
    fetchData : () => Promise<void>
}
const useCrud = <T>(intial:T[],api_url:string):IuseCrud<T> => {
    const jwtAxios = useAxiosWithInterceptor()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [dataCRUD, setDataCRUD] = useState<T[]>(intial)
    const fetchData = async () => {
        setIsLoading(true)
        try {
            // await new Promise(resolve => setTimeout(resolve,10000))
            const response = await jwtAxios.get(`${BASE_URL}${api_url}`,{})
            const data = response.data
            setDataCRUD(data)
            setError(null)
            setIsLoading(false)
            return data
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setError(new Error('400'))
            }
            setIsLoading(false)
            throw error
        }
    }
    return {dataCRUD: dataCRUD,fetchData: fetchData,isLoading: isLoading,error: error}
}

export default useCrud