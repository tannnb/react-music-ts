import React, {useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom'
import './index.scss'


let initState = [
    {icon: 'icon-home', label: '发现', path: '/recommend'},
    {icon: 'icon-video', label: '视频', path: '/video'},
    {icon: 'icon-community', label: '我的', path: '/oneself'},
    {icon: 'icon-communityUser', label: '云村', path: '/community'},
    {icon: 'icon-user', label: '账号', path: '/user'},
]
const Tabbar: React.FC = props => {
    const router = useHistory()
    const matchRoute = useRouteMatch()
    const [path, setPath] = useState(matchRoute.path)
    const [tab] = useState(initState)

    // 切换导航栏
    function onHandleToggleTab(e: any) {
        let currentPath = e.path
        setPath(currentPath)
        router.push(currentPath)
    }

    return (
        <div className='tabbar'>
            {
                tab.map((item, index) => (
                    <div key={index}
                         onClick={() => onHandleToggleTab(item)}
                         className={`tabbar-item ${path === item.path ? 'active' : ''}`}>
                        <div className='tabbar-item__icon'>
                            <i className={item.icon}/>
                        </div>
                        <div className='tabbar-item__text'>{item.label}</div>
                    </div>
                ))
            }
        </div>
    )
}
export default Tabbar
