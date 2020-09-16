import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

export const baseUrl = '';
const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 50000,
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => config,
    (error: AxiosError) => Promise.reject(error)
)
axiosInstance.interceptors.response.use(
    (config: AxiosResponse) => config.data,
    (error: AxiosError) => Promise.reject(error)
);
export {
    axiosInstance
};
