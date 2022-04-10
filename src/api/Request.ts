import request from "../uitils/request";


/**
 * 新歌推荐
 */

// type: 地区分类，默认为 0 // 0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本
type NewSongsType = (type?: '0' | '1' | '2' | '3' | '4' | '5', callback?: () => void) => Promise<any>
export const getNewSongs: NewSongsType = (type = '0') => {
    return request.get("/new/songs", {data: {type}});
};
