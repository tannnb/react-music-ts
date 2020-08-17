import React from 'react';
import {renderRoutes} from 'react-router-config';
import {BrowserRouter} from 'react-router-dom';
import routes from './routers'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
    );
}

export default App;
