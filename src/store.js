//Redux
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

function userInfoReducer(state = [], action) {
    if(action.type === 'USERINFO__LOAD') {
        state = action.userInfo
    }
    return state
}


function tweetsReducer(state = [], action) {
    if(action.type === 'TWEETS__LOAD_ITENS') {
        state = action.tweets
    }
    return state
}

export const configureStore = (preloadedState) => {
    return createStore(
        combineReducers({
                tweets: tweetsReducer,
                userInfo: userInfoReducer
        }),
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    )
}