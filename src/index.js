import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// Routes
import { BrowserRouter } from 'react-router-dom'
import { routes } from './routes'
//Redux
// import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
// import thunkMiddleware from 'redux-thunk'
import { configureStore } from './store'


const store = configureStore(window.__innitialData__)

console.log(store.getState())

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            { routes }
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
