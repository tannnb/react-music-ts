import axios, {AxiosRequestConfig, ResponseType, AxiosInstance, AxiosError, AxiosResponse} from 'axios'

const TIMEOUT = 50000
const SERVER = '';

interface IDictionary<T> {
    JSON: T
}

const MIME_TYPE: IDictionary<ResponseType> = {
    JSON: 'json',
}

const handleResponse = (config: AxiosResponse) => config.data
const handleError = (error: AxiosError) => Promise.reject(error)
const createInstance = () => {
    const instance = axios.create({
        baseURL: SERVER,
        timeout: TIMEOUT,
        withCredentials: true,
        responseType: MIME_TYPE.JSON,
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
