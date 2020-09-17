import {axiosInstance} from "./config";
import {BannerInter, SearchKeyWordInter} from "./types";

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

/**
 *
 */
type SearchRequestType = (keywords: string, offset?: number, limit?: number) => Promise<SearchKeyWordInter>
export const getSearchKeyWord: SearchRequestType = (keywords, offset = 1, limit = 30) => {
    return axiosInstance.get('/search', {
        params: {
            keywords,
            limit,
            offset: (offset - 1) * limit
        }
    })
}
