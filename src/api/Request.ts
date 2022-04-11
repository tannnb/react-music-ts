import request from "../uitils/request";

// type: 地区分类，默认为 0 // 0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本
interface Params {
    type: '0' | '1' | '2' | '3' | '4' | '5'
}

type NewSongsType = (params: Params, callback?: () => void) => Promise<any>
export const getNewSongs: NewSongsType = ({type = '0'}) => {
    return request.get("/new/songs", {params: {type}});
};
