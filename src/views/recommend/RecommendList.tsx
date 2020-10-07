import React, {useEffect, useRef} from 'react'
import {Play} from '@icon-park/react'
import Scroll from '../../base/Scroll'
import {formatPlayCount} from "../../utils/format";
import {useHorizontalWidth} from "../../hook/useHorizontalWidth";

interface RecommendListProps {
    data: { [key: string]: string | any }
}

const RecommendList: React.FC<RecommendListProps> = (props) => {
    const entryRef = useRef<any>(null)

    const {uiElement: {mainTitle, subTitle, button}, creatives} = props.data
    creatives.map((item: any) => {
        let core = item.uiElement
        core.playCount = item.resources[0].resourceExtInfo.playCount
        core.mainTitle = core.mainTitle.title
        core.image = core.image.imageUrl
    })

    /**
     * 计算横向滚动宽度
     */
    const {setHorizontalWidth} = useHorizontalWidth()
    useEffect(() => {
        setHorizontalWidth(entryRef)
    }, [])

    const handleLoadImg = () => {
        entryRef.current.refresh()
    }

    const handleItemClick = (data: any) => {
        console.log(data)
    }

    return (
        <div className='recommendList_wrapper'>
            <div className='header_title'>
                <span>{`${mainTitle.title}·${subTitle.title}`}</span>
                <span>{button.text}</span>
            </div>
            <div className='recommendList_scroll'>
                <Scroll ref={entryRef} direction={'horizontal'}>
                    {
                        creatives.map((item: any) => {
                            let {mainTitle, image, playCount} = item.uiElement
                            return (
                                <div className='item' key={item.creativeId} onClick={() => handleItemClick(item)}>
                                    <div className='maker'>
                                        <img className='image' onLoad={handleLoadImg} src={image} alt=""/>
                                    </div>
                                    <div className='mainTitle'>{mainTitle}</div>
                                    <span className='playCount'>
                                        <Play theme="outline" size="16" fill="#fff"/>
                                        {formatPlayCount(playCount)}
                                    </span>
                                </div>
                            )
                        })
                    }
                </Scroll>
            </div>
        </div>
    )
}

export default React.memo(RecommendList)
