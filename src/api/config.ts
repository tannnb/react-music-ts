import axios, {AxiosResponse} from 'axios'

export const baseUrl = '';
const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 50000,
    withCredentials: true
});
axiosInstance.interceptors.response.use(
    (config: AxiosResponse) => config.data,
    error => Promise.reject(error)
);
export {
    axiosInstance
};
