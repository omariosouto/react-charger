import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import App from './App'
import RandomPageRedux from './RandomPageRedux'

function myAppAuth() {
    // PEGA ALGO DO LOCALSTORAGE
    return true
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
       myAppAuth() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )

export const routes = (
            <Switch>
                <Route path="/" exact={true} component={App}/>
                <PrivateRoute path="/random" component={RandomPageRedux}/>
            </Switch>
        )