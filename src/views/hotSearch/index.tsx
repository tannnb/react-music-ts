import React, {useEffect, useRef, useState} from 'react'
import {RouteComponentProps} from "react-router-dom";
import {People} from "@icon-park/react";
import {getBannerRequest, getHotDetail} from "../../api/Request";
import CounterContainer from '../../store/container'
import HotList from './HotList'
import Scroll from "../../base/Scroll";
import Transition from '../../base/Transition'
import SearchInput from '../../base/SearchInput'
import './index.scss'


const HotSearch: React.FC<RouteComponentProps> = (props) => {
    const {banner, dispatchBanner} = CounterContainer.useContainer()


    const scrollRef = useRef<any>(null)

    const [sliderFlag, setSliderFlag] = useState<Boolean | any>(false)
    useEffect(() => {
        setSliderFlag(true)
    }, [])

    const [adData, setAdData] = useState<object>({})
    useEffect(() => {
        if (banner && banner.length === 0) {
            const getBanner = async () => {
                let {banners} = await getBannerRequest()
                dispatchBanner(banners)
                setAdData(banners[0])
            }
            getBanner()
        } else {
            setAdData(banner[0])
        }
    }, [])


    const [hotData, setHotData] = useState<Array<object>>([])
    useEffect(() => {
        const fetchHot = async () => {
            let {data} = await getHotDetail()
            setHotData(data)
        }
        fetchHot()
    }, [])


    const handleCancel = () => {
        props.history.goBack()
    }
    const handleLoadImg = () => {
        scrollRef.current.refresh()
    }

    const handleChange = (data: string) => {
        console.log('data', data)
    }

    const handleSelectItem = (data: object) => {
        console.log(data)
    }

    // 广告位
    const renderAdvertising = (adData: any) => {
        return (
            <div className='advertising-wrapper'>
                <img onLoad={handleLoadImg} src={adData.imageUrl} alt=""/>
            </div>
        )
    }

    return (
        <Transition in={sliderFlag} animation='slider-in-left' timeout={1000}>
            <div className='search-page'>
                <div className='search-wrapper'>
                    <SearchInput onChange={handleChange}/>
                    <div className='search-wrapper-cancel' onClick={handleCancel}>取消</div>
                    <div className='search-wrapper-singer'>
                        <People theme="outline" size="20" fill="#333"/>
                    </div>
                </div>

                <Scroll ref={scrollRef} className={'search-scroll'}>
                    {adData ? renderAdvertising(adData) : null}

                    <div className='hot-title'>热搜榜</div>
                    <HotList hotData={hotData} onSelect={handleSelectItem}/>
                </Scroll>
            </div>
        </Transition>
    )
}

export default React.memo(HotSearch)
