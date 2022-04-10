import React from 'react';
// @ts-ignore
import ReactDOM from "react-dom/client";
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import ErrorBoundary from './base/ErrorBoundary'
import reportWebVitals from './reportWebVitals';

import 'normalize.css'
import './assets/style/index.scss';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ErrorBoundary>
        <Provider store={store}>
            <App/>
        </Provider>
    </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
