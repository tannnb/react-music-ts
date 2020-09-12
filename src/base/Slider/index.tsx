import React, {useEffect} from 'react'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import './index.scss'

interface BannerProps {
    loop?: boolean;
    autoplay?: object;
    banner: { [key: string]: any }[];
    onSelect?: (e: React.MouseEvent) => void
}

const Slider: React.FC<BannerProps> = (props) => {
    const {banner, loop, autoplay, onSelect} = props

    useEffect(() => {
        if (banner!.length) {
            new Swiper('.slider-container', {
                loop,
                autoplay,
                pagination: {el: '.swiper-pagination'},
            })
        }
    }, [autoplay, banner, loop])


    const handleSwiperClick = (data: any) => {
        if (onSelect) {
            onSelect(data)
        }
    }

    return (
        <div className="Slider-wrapper">
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {banner!.map(slider => {
                        return (
                            <div className="swiper-slide" onClick={() => handleSwiperClick(slider)}
                                 key={slider.imageUrl}>
                                <div className="slider-nav">
                                    <img src={slider.imageUrl} alt={slider.typeTitle}/>
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
Slider.defaultProps = {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    }
}

export default React.memo(Slider)
