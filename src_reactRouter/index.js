import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';

// React Router Stuff
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

import registerServiceWorker from './registerServiceWorker';
window.__initialData__ = window.__initialData__ || {} 

ReactDOM.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();