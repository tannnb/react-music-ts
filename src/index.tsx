import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Provider from './store'
import ErrorBoundary from './base/ErrorBoundary'
import * as serviceWorker from './serviceWorker';

import 'normalize.css'
import './assets/style/common.scss'

ReactDOM.render(
    <ErrorBoundary>
        <Provider>
            <App/>
        </Provider>
    </ErrorBoundary>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();
