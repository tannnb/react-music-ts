import React, {useEffect, useRef, useState} from 'react'
import NavBar from "../../base/NavBar";
import Tabbar from "../../base/Tabbar";
import Slider from '../../base/Slider'
import Scroll from '../../base/Scroll'
import QuickEntry from "./QuickEntry";
import './index.scss'

import {getBannerRequest} from "../../api/recommend";

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
const Recommend = () => {

    const [banners, setBanners] = useState([])
    useEffect(() => {
        const getBanner = async () => {
            let {banners} = await getBannerRequest() as any
            setBanners(banners)
        }
        getBanner()
    }, [])

    const [iconData] = useState(quickData)
    const entryRef = useRef<any>(null)

    /**
     * 计算横向滚动宽度
     */
    useEffect(() => {
        let categoryDOM = entryRef.current?.getBSWrapper().current
        let tagElements = categoryDOM.querySelectorAll('.enterItem')
        let totalWidth = 0
        Array.from(tagElements).forEach((ele: any) => {
            totalWidth += ele.offsetWidth
        })
        categoryDOM.style.width = `${totalWidth}px`
        entryRef.current.refresh()
    }, [iconData])

    const handleBack = () => {
    }

    const pullUpFc = (e: React.TouchEvent) => {
    }

    const onScroll = (e: React.WheelEvent) => {
    }

    const handleClickLink = (e: React.MouseEvent) => {
        let bsScroll = entryRef.current!.getBSInstance()
        bsScroll.scrollToElement(e.currentTarget, 500, true)
    }

    return (
        <div className='app_wrapper'>
            <NavBar back={false} leftClick={handleBack}/>
            <div className='body_wrapper'>
                <Scroll onScroll={(pos: React.WheelEvent) => onScroll(pos)} pullUp={(pos: React.TouchEvent) => pullUpFc(pos)}>

                    {banners && <Slider banner={banners}/>}

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
