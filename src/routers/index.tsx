import React, {lazy, Suspense, LazyExoticComponent} from 'react';
import {Redirect} from 'react-router-dom'


const SuspenseComponent = (Component: LazyExoticComponent<any>) => (props: any) => {
    return (
        <Suspense fallback={null}>
            <Component {...props} />
        </Suspense>
    )
}

const RecommendComponent = lazy(() => import("../views/recommend"));
const HotSearchComponent = lazy(() => import("../views/hotSearch"));


export default [
    {
        path: '/',
        exact: true,
        render: () => (<Redirect to={'/recommend'}/>)
    },
    {
        path: '/recommend',
        component: SuspenseComponent(RecommendComponent)
    },
    {
        path: '/hotSearch',
        component: SuspenseComponent(HotSearchComponent)
    },
]
