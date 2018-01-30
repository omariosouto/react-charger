import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
// Routes
import { BrowserRouter } from 'react-router-dom'
import { routes } from './routes'



ReactDOM.render(
    <BrowserRouter>
        { routes }
    </BrowserRouter>,
    document.getElementById('root'));
// registerServiceWorker();
