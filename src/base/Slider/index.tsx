import React, {useEffect} from 'react'
import Swiper, {Pagination, Autoplay} from 'swiper'
import 'swiper/swiper-bundle.css';
import './index.scss'

Swiper.use([Pagination, Autoplay])

interface BannerProps {
    loop?: boolean;
    autoplay?: object;
    banner: { [key: string]: any }[];
    onSelect?: (e: React.MouseEvent) => void
}

const Slider: React.FC<BannerProps> = (props) => {
    const {banner, loop = true, onSelect} = props
    useEffect(() => {
        if (banner!.length) {
            new Swiper('.slider-container', {
                loop,
                speed: 400,
                spaceBetween: 100,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            })
        }
    }, [banner, loop])


    const handleSwiperClick = (data: React.MouseEvent) => {
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
                            <div className="swiper-slide" onClick={() => handleSwiperClick(slider as React.MouseEvent)}
                                 key={slider.imageUrl}>
                                <div className="slider-nav">
                                    <img className="swiper-lazy" src={slider.imageUrl} alt={slider.typeTitle}/>
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
