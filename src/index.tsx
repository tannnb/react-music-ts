import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import ErrorBoundary from './base/ErrorBoundary'
import reportWebVitals from './reportWebVitals';

import 'normalize.css'
import './assets/style/index.scss';

ReactDOM.render(
    <ErrorBoundary>
        <Provider store={store}>
            <App/>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
