import {axiosInstance} from "./config";
import {BannerInter} from "./types";

/**
 * 获取banner
 */
type BannerRequestType = () => Promise<BannerInter>
export const getBannerRequest: BannerRequestType = () => {
    return axiosInstance.get("/banner");
};

export const getRecommendListRequest = () => {
    return axiosInstance.get('/personalized');
}

/**
 * 默认搜索关键词
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getDefaultSearch = () => {
    return axiosInstance.get('/search/default')
}


/**
 * 热搜列表
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getHotDetail = () => {
    return axiosInstance.get('/search/hot/detail')
}
