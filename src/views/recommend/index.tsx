import React from 'react'
import {RouteConfigComponentProps} from "react-router-config";
import CounterContainer from '../../store/container'
import NavBar from "../../base/NavBar";
import Tabbar from "../../base/Tabbar";

const recommend: React.FC<RouteConfigComponentProps> = props => {
    let {count, increment} = CounterContainer.useContainer()

    const handleBack = () => {
        console.log('2e')
    }

    return (
        <div className='app_wrapper'>
            <NavBar back={false} leftClick={handleBack}/>
            <div className='body_wrapper'>
                <div>{count}</div>
                Recommend
                <button onClick={increment}>增加</button>
            </div>
            <div className='footer_wrapper'>
                <Tabbar/>
            </div>
        </div>
    )
}

export default recommend
