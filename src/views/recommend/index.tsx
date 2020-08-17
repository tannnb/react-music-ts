import React from 'react'
import {RouteConfigComponentProps} from "react-router-config";
import CounterContainer from '../../store/container'

const recommend: React.FC<RouteConfigComponentProps> = props => {
    let {count, increment} = CounterContainer.useContainer()
    return (
        <div>
            <div>{count}</div>
            Recommend
            <button onClick={increment}>增加</button>
        </div>
    )
}

export default recommend
