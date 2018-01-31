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

function reposReducer(state = [], action) {
    if(action.type === 'LOAD_ITENS') {
        state = [1,2,3,4,5,6]
        console.log(state)
    }
    return state
}

const store = createStore(
    combineReducers({
            repos: reposReducer,
            trocos: reposReducer
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
