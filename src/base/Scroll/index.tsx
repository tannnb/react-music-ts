import React, {
    forwardRef,
    useState,
    useEffect,
    useRef,
    useImperativeHandle
} from 'react'
import BScroll from '@better-scroll/core'

let scrollStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
}
type directionType = 'vertical' | 'horizontal'
type RefProps = {}

interface ScrollProps {
    style?: object;
    direction: directionType;
    click?: boolean;
    refresh?: boolean;
    onScroll?: (e: any) => void;
    pullUp?: (e: any) => void;
    pullDown?: (e: any) => void;
    pullUpLoading?: boolean;
    pullDownLoading?: boolean;
    bounceTop?: boolean;
    bounceBottom?: boolean;
    stopPropagation?: boolean;
}


const Scroll = forwardRef<RefProps, ScrollProps>((props, ref) => {
    const {direction, click, refresh, bounceTop, bounceBottom, pullUp, pullDown, onScroll} = props

    const [scroll, setScroll] = useState()
    const scrollContentRef = useRef<HTMLDivElement>(null)
    const scrollInternalRef = useRef<HTMLDivElement>(null)

    /**
     * 初始化BScroll实例
     */
    useEffect(() => {
        let scroll = new BScroll(scrollContentRef.current!, {
            scrollX: direction === 'horizontal',
            scrollY: direction === 'vertical',
            probeType: 2,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom,
            },
        })
        setScroll(scroll)
        return () => {
            setScroll(null)
        }
    }, [])

    /**
     * 刷新
     */
    useEffect(() => {
        if (refresh && scroll) {
            scroll.refresh()
        }
    })

    /**
    * 上拉
    */
    useEffect(() => {
        if (!pullUp || !scroll) {
            return
        }
        scroll.on('scrollEnd', (e: MouseEvent) => {
            if (scroll.y <= scroll.maxScrollY + 100) {
                pullUp(e)
            }
        })

        return () => {
            scroll.off('scrollEnd')
        }
    }, [scroll, pullUp])

    /**
    * 下拉
    */
    useEffect(() => {
        if (!pullDown || !scroll) {
            return
        }
        scroll.on('touchEnd', (e: MouseEvent) => {
            // 判断用户的下拉动作
            e.y > 50 && pullDown(e)
        })
        return () => {
            scroll.off('touchEnd')
        }
    }, [scroll, pullDown])

    /**
     * 监听滚动
     */
    useEffect(() => {
        if (!onScroll || !scroll) {
            return
        }
        scroll.on('scroll', (e: MouseEvent) => {
            onScroll(e)
        })
        return () => {
            scroll.off('scroll')
        }
    }, [scroll, onScroll])

    /**
     * 返回可操作对象
     */
    useImperativeHandle(ref, () => ({
        refresh() {
            if (scroll) {
                scroll.refresh()
                scroll.scrollTo(0, 0)
            }
        },
        getBSInstance() {
            return scroll || null
        },
        getBSWrapper() {
            return scrollInternalRef || null
        },
    }))

    return (
        <div style={scrollStyle} ref={scrollContentRef}>
            <div ref={scrollInternalRef}>{props.children}</div>
        </div>
    )
})

Scroll.defaultProps = {
    direction: 'vertical', // 滚动方向
    click: true, // 是否支持点击
    refresh: true, // 是否刷新
    pullUpLoading: false, // 上拉加载
    pullDownLoading: false, // 下拉加载
    bounceTop: true, // 是否支持向上吸顶
    bounceBottom: true, // 是否支持向下吸顶
    stopPropagation: false, // 阻止冒泡,用于嵌套
}

export default Scroll

