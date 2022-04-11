import axios, {AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse} from 'axios'

const SERVER = '';
const handleResponse = (config: AxiosResponse) => config.data
const handleError = (error: AxiosError) => Promise.reject(error)
const createInstance = () => {
    const instance = axios.create({
        baseURL: SERVER,
        timeout: 50000,
        withCredentials: true,
        responseType: 'json',
    })
    instance.interceptors.response.use(handleResponse, handleError)
    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}

interface Instance extends AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
}
const request: Instance = createInstance()
export default request
