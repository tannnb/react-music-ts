import React, {useState} from 'react';
import {Home, Video, Me, ThinkingProblem} from '@icon-park/react'
import {useHistory, useRouteMatch} from 'react-router-dom'
import './index.scss'


let initState = [
    {label: '发现', type: 'Home', path: '/recommend'},
    {label: '视频', type: 'Video', path: '/video'},
    {label: '我的', type: 'ThinkingProblem', path: '/oneself'},
    {label: '账号', type: 'Me', path: '/user'},
]


const Tabbar = () => {
    const router = useHistory()
    const matchRoute = useRouteMatch()
    const [path, setPath] = useState(matchRoute.path)
    const [tab] = useState(initState)

    // 切换导航栏
    function onHandleToggleTab(e) {
        let currentPath = e.path
        setPath(currentPath)
        router.push(currentPath)
    }

    const switchComponent = (item) => {
        let classes = {
            theme: 'outline',
            size: '20',
            fill: item.path === path ? '#ec4e3d' : '#333'
        }
        switch (item.type) {
            case 'Home':
                return <Home {...classes} />
            case 'Video':
                return <Video {...classes} />
            case 'ThinkingProblem':
                return <ThinkingProblem {...classes} />
            case 'Me':
                return <Me {...classes} />
        }
    }

    return (
        <div className='tabbar'>
            {
                tab.map((item, index) => (
                    <div key={index}
                         onClick={() => onHandleToggleTab(item)}
                         className={`tabbar-item ${path === item.path ? 'active' : ''}`}>
                        <div className='tabbar-item__icon'>
                            {switchComponent(item)}
                        </div>
                        <div className='tabbar-item__text'>{item.label}</div>
                    </div>
                ))
            }
        </div>
    )
}
export default Tabbar
