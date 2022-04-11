import React, {Suspense, lazy} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increment, getCurrentValue} from './store/playSlice';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Loading} from './base/Loading'

const asyncComponent = (page: string) => lazy(() =>
    import(`./views/${page}`).then(module => ({default: module[page]}))
)
const HomeAsync = asyncComponent('Home')
const NotFoundAsync = asyncComponent('NotFound')

function App() {
    const count = useSelector(getCurrentValue);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(increment(100))
    }
    return (
        <Suspense fallback={<Loading/>}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to='/find'/>}/>
                    <Route path="/find" element={<HomeAsync/>}/>
                    <Route path="*" element={<NotFoundAsync/>}/>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
