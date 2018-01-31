import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// Routes
import { BrowserRouter } from 'react-router-dom'
import { routes } from './routes'
//Redux
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

function postsReducer(store = [], action) {
    if(action.type === 'LOAD_ITENS') {
        store = [1,2,3,4,5,6]
    }

    return store
}

const store = createStore(
    combineReducers({
            posts: postsReducer
    }),
    applyMiddleware(
        thunkMiddleware
    )
)

console.log(store.getState())

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            { routes }
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
