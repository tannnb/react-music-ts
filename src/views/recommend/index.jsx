import React, {useEffect, useRef, useState} from 'react'
import CounterContainer from '../../store/container'
import NavBar from "../../base/NavBar";
import Tabbar from "../../base/Tabbar";
import Slider from '../../base/Slider'
import Scroll from '../../base/Scroll'

import {getBannerRequest} from "../../api/recommend";


const Recommend = props => {
    let {count, increment} = CounterContainer.useContainer()
    const [banners, setBanners] = useState([])
    const ScrollRef = useRef(null)

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
        console.log('pos')
    }

    const onScroll = (pos) => {
            console.log('scroll:', pos)
    }
    
    return (
        <div className='app_wrapper'>
            <NavBar back={false} leftClick={handleBack}/>
            <div className='body_wrapper'>
                <Scroll ref={ScrollRef} onScroll={e => onScroll(e)} pullUp={pos => pullUpFc(pos)}>

                    {banners && <Slider banner={banners}/>}

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
