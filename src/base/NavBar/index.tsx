import React from 'react'
import './index.scss'


interface NavBarInter {
    title?: string,
    back?: boolean,
    leftClick?: () => void
}

const NavBar: React.FC<NavBarInter> = props => {
    const {back = true, leftClick, title = 'music'} = props

    const renderBack = () => {
        return (
            <div className='NavBar_item NavBar_left' onClick={leftClick}>
                <span className='icon'></span>
            </div>
        )
    }
    return (
        <div className='NavBar'>
            {back ? renderBack() : null}
            <div className='NavBar_item NavBar_center'>{title}</div>
            <div className='NavBar_item NavBar_right'>右侧</div>
        </div>
    )
}

export default NavBar
