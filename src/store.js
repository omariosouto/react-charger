//Redux
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'


function reposReducer(state = [], action) {
    if(action.type === 'REPOS__LOAD_ITENS') {
        state = [1,2,3,4,5,6]
    }
    if(action.type === 'REPOS__ADD_ONE') {
        state = [...state, action.item]
    }
    return state
}

function chatReducer(state = [], action) {
    if(action.type === 'CHAT__LOAD_ITENS') {
        state = [1,2,3,4,5,6]
    }
    if(action.type === 'CHAT__ADD_ONE') {
        state = [...state, action.item]
    }
    return state
}


export const configureStore = (preloadedState) => {
    return createStore(
        combineReducers({
                repos: reposReducer,
                chat: chatReducer
        }),
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    )
}