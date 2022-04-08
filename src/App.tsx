import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increment, getCurrentValue} from './store/playSlice';

function App() {
    const count = useSelector(getCurrentValue);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(increment(100))
    }
    return (
        <div className="App">
            app-{count}
            <button onClick={() => handleClick()}>点击</button>
        </div>
    );
}

export default App;
