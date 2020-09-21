import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import BScroll, {BScrollInstance} from '@better-scroll/core'


let scrollStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
}

export interface RefProps {
    refresh(): void;
    getBSInstance(): void;
    getBSWrapper(): void;
}

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
    className?: any;
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
        onScroll,
        className
    } = props

    const BScrollRef = useRef<BScrollInstance | null>(null)
    const scrollContentRef = useRef<HTMLDivElement>(null)
    const scrollInternalRef = useRef<HTMLDivElement>(null)

    /**
     * 初始化BScroll实例
     */
    useEffect(() => {
        BScrollRef.current = new BScroll(scrollContentRef.current!, {
            scrollX: direction === 'horizontal',
            scrollY: direction === 'vertical',
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom,
            }
        })
        return () => {
            BScrollRef.current = null
        }
    }, [])


    /**
     * 自动刷新
     */
    useEffect(() => {
        if (refresh && BScrollRef.current) {
            BScrollRef.current.refresh()
        }
    })


    useEffect(() => {
        if (!pullUp || !BScrollRef.current) {
            return
        }
        let BSInstance = BScrollRef.current
        BSInstance.on('scrollEnd', (e: MouseEvent) => {
            if (BSInstance.y <= BSInstance.maxScrollY + 100) {
                pullUp(e)
            }
        })
        return () => {
            BScrollRef.current?.off('scrollEnd')
        }
    }, [ pullUp])


    useEffect(() => {
        if (!pullDown || !BScrollRef.current) {
            return
        }
        let BSInstance = BScrollRef.current
        BSInstance.on('touchEnd', (e: MouseEvent) => {
            e.y > 100 && pullDown(e)
        })
        return () => {
            BScrollRef.current?.off('touchEnd')
        }
    }, [ pullDown])


    useEffect(() => {
        if (!onScroll || !BScrollRef.current) {
            return
        }
        let BSInstance = BScrollRef.current
        BSInstance.on('scroll', (e: MouseEvent) => {
            onScroll(e)
        })
        return () => {
            BScrollRef.current?.off('scroll')
        }
    }, [ onScroll])


    useImperativeHandle(ref, () => ({
        refresh(): any {
            if (BScrollRef.current) {
                BScrollRef.current.refresh()
                BScrollRef.current.scrollTo(0, 0)
            }
        },
        getBSInstance(): any {
            return BScrollRef
        },
        getBSWrapper(): any {
            return scrollInternalRef
        },
    }))


    return (
        <div style={scrollStyle} ref={scrollContentRef} className={className}>
            <div ref={scrollInternalRef} className='scrollInner'>{props.children}</div>
        </div>
    )
})

export default Scroll

