import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';

// React Router Stuff
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'


import registerServiceWorker from './registerServiceWorker';
// Redux Things
import { Provider } from 'react-redux'
import { configureStore } from './store'

window.__initialData__ = window.__initialData__ || {}
 
const store = configureStore(window.__initialData__)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();