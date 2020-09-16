import React from 'react'
import {Search,Left} from '@icon-park/react'
import './index.scss'

interface NavBarInter {
    back?: boolean;
    leftClick?: (e: React.MouseEvent) => void;
    rightClick?: (e: React.MouseEvent) => void;
    children: React.ReactNode
}

const NavBar: React.FC<NavBarInter> = props => {
    const {back = false, leftClick, rightClick, children} = props

    const renderBack = () => {
        return (
            <div className='NavBar_item NavBar_left' onClick={leftClick}>
                <Left theme="outline" size="20" fill="#a0a0a0"/>
            </div>
        )
    }
    return (
        <div className='NavBar'>
            {back ? renderBack() : null}
            <div className='NavBar_item NavBar_center'>{children}</div>
            <div className='NavBar_item NavBar_right'>
                <Search onClick={rightClick} theme="outline" size="20" fill="#a0a0a0"/>
            </div>
        </div>
    )
}

export default NavBar
