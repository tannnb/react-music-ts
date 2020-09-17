import React, {useEffect, useRef, useState} from 'react'
import {RouteComponentProps} from "react-router-dom";
import {People, Search} from "@icon-park/react";
import lodash from 'lodash'
import {getBannerRequest, getHotDetail, getSearchKeyWord} from "../../api/Request";
import CounterContainer from '../../store/container'
import HotList from './HotList'
import Scroll from "../../base/Scroll";
import Transition from '../../base/Transition'
import SearchInput from '../../base/SearchInput'
import {joint} from "../../utils/format";
import './index.scss'


type QueryType<T> = (query: string, offset: number) => Promise<T>

interface QueryInter {
    songs?: Array<any>,
    hasMore?: Boolean,
    songCount: number
}

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


    /**
     * 热搜榜
     */
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


    /**
     * 搜索
     */
    const [query, setQuery] = useState<string>('')
    const [queryList, setQueryList] = useState<any[]>([])
    const offsetRef = useRef<number>(1) // 分页
    const handleChange = (data: string) => {
        if (data) {
            setQuery(data)
        } else {
            setQueryList([])
        }
    }
    useEffect(() => {
        if (query) {
            offsetRef.current = 1
            getQueryRequest(query, offsetRef.current).then((result: QueryInter) => {
                setQueryList(result.songs as any)
            })
        }
    }, [query])
    const getQueryRequest: QueryType<any> = (query: string, offset: number) => {
        return new Promise(async resolve => {
            const {result} = await getSearchKeyWord(query, offset)
            resolve(result)
        })
    }


    const handlePullUp: (e: { x: number, y: number }) => void = async () => {
        offsetRef.current++;
        const result = await getQueryRequest(query!, offsetRef.current)
        let uniData = lodash.uniqBy(queryList.concat(result.songs), 'id')
        setQueryList(uniData)
    }

    const handleSelectItem = (data: object) => {
        console.log(data)
    }
    const handleListClick = (data: object) => {
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

                {
                    queryList && queryList.length === 0 ?
                        <Scroll ref={scrollRef} className={'search-scroll'}>
                            {adData ? renderAdvertising(adData) : null}
                            <div className='hot-title'>热搜榜</div>
                            <HotList hotData={hotData} onSelect={handleSelectItem}/>
                        </Scroll> :
                        <Scroll pullUp={e => handlePullUp(e)}>
                            {
                                queryList.map((item: any) => {
                                    return (
                                        <div className='query-wrapper' key={item.id}
                                             onClick={() => handleListClick(item)}>
                                            <Search theme="outline" size="18" fill="#b6b4b4"/>
                                            <div
                                                className='queryLabel'>{item.name} - {joint(item.artists, 'name')} - {item.alias}</div>
                                        </div>
                                    )
                                })
                            }
                        </Scroll>
                }
            </div>
        </Transition>
    )
}

export default React.memo(HotSearch)
