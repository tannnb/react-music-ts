import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react'
import BScroll, {BScrollInstance} from '@better-scroll/core'

let scrollStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
}
type RefProps = {}

interface ScrollProps {
    style?: object;
    direction?: 'vertical' | 'horizontal';
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
    children: React.ReactNode
}

const Scroll = forwardRef<RefProps, ScrollProps>((props, ref) => {
    const {
        direction = 'vertical',
        click = true,
        refresh = true,
        bounceTop = true,
        bounceBottom = true,
        pullUp,
        pullDown,
        onScroll
    } = props

    const [scroll, setScroll] = useState<BScrollInstance | null>(null)
    const scrollContentRef = useRef<HTMLDivElement | null>(null)
    const scrollInternalRef = useRef(null)

    /**
     * 初始化BScroll实例
     */
    useEffect(() => {
        let scrolls = new BScroll(scrollContentRef.current!, {
            scrollX: direction === 'horizontal',
            scrollY: direction === 'vertical',
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom,
            },
        })
        setScroll(scrolls)
        return () => {
            setScroll(null)
        }
    }, [setScroll])

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
            if(scroll) return scroll
        },
        getBSWrapper() {
            if(scrollInternalRef) return scrollInternalRef
        },
    }))

    return (
        <div style={scrollStyle} ref={scrollContentRef}>
            <div ref={scrollInternalRef}>{props.children}</div>
        </div>
    )
})

export default Scroll

