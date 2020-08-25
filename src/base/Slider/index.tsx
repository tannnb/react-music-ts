import React, {useEffect} from 'react'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import './index.scss'


function Slider(props: any) {
    const {banner} = props

    useEffect(() => {
        if (banner.length) {
            new Swiper('.slider-container', {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {el: '.swiper-pagination'},
            })
        }
    }, [banner])

    return (
        <div className="Slider-wrapper">
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {banner.map((slider: any) => {
                        return (
                            <div className="swiper-slide" key={slider.imageUrl}>
                                <div className="slider-nav">
                                    <img src={slider.imageUrl} alt="推荐"/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    )
}

export default React.memo(Slider)
