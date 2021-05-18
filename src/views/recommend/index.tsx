import React, {useEffect, useRef, useState} from 'react'
import {RouteComponentProps} from "react-router-dom";
import {getBannerRequest, getHomeBlock} from "../../api/Request";
import {useHorizontalWidth} from "../../hook/useHorizontalWidth";
import NavBar from "../../base/NavBar";
import Tabbar from "../../base/Tabbar";
import Slider from '../../base/Slider'
import Scroll from '../../base/Scroll'
import QuickEntry from "./QuickEntry";
import RecommendList from './RecommendList'
import './index.scss'
import CounterContainer from '../../store/container'

interface RecommendProps {
}

type RecommendType = RecommendProps & RouteComponentProps

let quickData = [
    {
        id: 1,
        icon: 'icon-recommend',
        label: "每日推荐"
    },
    {
        id: 2,
        icon: 'icon-playlist',
        label: "歌单"
    },
    {
        id: 3,
        icon: 'icon-ranking',
        label: "排行榜"
    },
    {
        id: 4,
        icon: 'icon-radio',
        label: "电台"
    },
    {
        id: 5,
        icon: 'icon-live',
        label: "直播"
    },
    {
        id: 6,
        icon: 'icon-hot',
        label: "火前留名"
    },
    {
        id: 7,
        icon: 'icon-album',
        label: "数字专辑"
    },
    {
        id: 8,
        icon: 'icon-sing',
        label: "唱聊"
    },
]
const Recommend: React.FC<RecommendType> = props => {

    const {banner, dispatchBanner} = CounterContainer.useContainer()

    useEffect(() => {
        if (banner && banner.length === 0) {
            const getBanner = async () => {
                let {banners} = await getBannerRequest() as any
                dispatchBanner(banners)
            }
            getBanner()
        }
    }, [])

    const [iconData] = useState(quickData)
    const entryRef = useRef<any>(null)

    /**
     * 计算横向滚动宽度
     */
    const {setHorizontalWidth} = useHorizontalWidth()
    useEffect(() => {
        setHorizontalWidth(entryRef)
    }, [iconData])


    const [recommend, setRecommend] = useState<any>(null)
    useEffect(() => {
        if (!recommend) {
            const getHome = async () => {
                const result = await getHomeBlock()
                setRecommend(result.data.blocks[0])
            }
            getHome()
        }
    }, [])

    const handleSearch = () => {
        props.history.push('/hotSearch')
    }

    const pullUpFc = (e: React.TouchEvent) => {
    }

    const onScroll = (e: React.WheelEvent) => {
    }

    const handleClickLink = (e: React.MouseEvent) => {
        let bsScroll = entryRef.current!.getBSInstance()
        bsScroll.current.scrollToElement(e.currentTarget, 500, true)
    }

    return (
        <div className='app_wrapper'>
            <NavBar rightClick={handleSearch}>Muisc</NavBar>
            <div className='body_wrapper'>
                <Scroll onScroll={(pos: React.WheelEvent) => onScroll(pos)}
                        pullUp={(pos: React.TouchEvent) => pullUpFc(pos)}>

                    {banner && <Slider banner={banner}/>}

                    <div className='quickEntry-wrapper'>
                        <Scroll ref={entryRef} direction={'horizontal'}>
                            {iconData.map(item => (
                                <div className='enterItem'
                                     key={item.id}
                                     onClick={(e: React.MouseEvent) => handleClickLink(e)}>
                                    <QuickEntry data={item}/>
                                </div>
                            ))}
                        </Scroll>
                        <div className='slider_playlist'>
                            {recommend && <RecommendList data={recommend} />}
                        </div>
                    </div>

                </Scroll>
            </div>
            <div className='footer_wrapper'>
                <Tabbar/>
            </div>
        </div>
    )
}

export default Recommend
