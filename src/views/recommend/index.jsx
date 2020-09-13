import React, {useEffect, useRef, useState} from 'react'
import CounterContainer from '../../store/container'
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
    let {count, increment} = CounterContainer.useContainer()

    const [banners, setBanners] = useState([])
    const ScrollRef = useRef(null)

    const [iconData] = useState(quickData)
    const EntryRef = useRef(null)

    const [random, setRandom] = useState([])


    useEffect(() => {
        let a = []
        for (let i = 0; i < 100; i++) {
            a.push(i)
        }
        setRandom(a)
        const getBanner = async () => {
            let {banners} = await getBannerRequest()
            setBanners(banners)
        }
        getBanner()
    }, [])

    const handleBack = () => {
    }

    const pullUpFc = (pos) => {
    }

    const onScroll = (pos) => {
    }

    /**
     * 计算横向滚动宽度
     */
    useEffect(() => {
        let categoryDOM = EntryRef.current?.getBSWrapper().current
        let tagElements = categoryDOM.querySelectorAll('.enterItem')
        let totalWidth = 0
        Array.from(tagElements).forEach((ele) => {
            totalWidth += ele.offsetWidth
        })
        categoryDOM.style.width = `${totalWidth}px`
        EntryRef.current.refresh()
    }, [iconData])

    const handleClickLink = (e) => {
        let bsScroll = EntryRef.current.getBSInstance()
        bsScroll.scrollToElement(e.currentTarget, 300, true)
    }

    return (
        <div className='app_wrapper'>
            <NavBar back={false} leftClick={handleBack}/>
            <div className='body_wrapper'>
                <Scroll ref={ScrollRef} onScroll={e => onScroll(e)} pullUp={pos => pullUpFc(pos)}>

                    {/*轮播图*/}
                    {banners && <Slider banner={banners}/>}


                    <div className='quickEntry-wrapper'>
                        <Scroll ref={EntryRef} direction={'horizontal'}>
                            {iconData.map(item => (
                                <div className='enterItem'
                                     key={item.id}
                                     onClick={(e) => handleClickLink(e)}>
                                    <QuickEntry data={item}/>
                                </div>
                            ))}
                        </Scroll>
                    </div>

                    {
                        random.map(item => (
                            <div key={item}>{count}</div>
                        ))
                    }


                    Recommend
                    <button onClick={increment}>增加</button>

                </Scroll>
            </div>
            <div className='footer_wrapper'>
                <Tabbar/>
            </div>
        </div>
    )
}

export default Recommend
