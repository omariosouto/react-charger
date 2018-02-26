import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import asyncComponent from './components/AsyncComponent'


// Pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'
const AsyncAbout = asyncComponent(() => import("./pages/About")); // This component will be loaded async :)
const AsyncListTweets = asyncComponent(() => import("./pages/ListTweetsPrivate")); // This component will be loaded async :)

function isAuth() {
    // if(localStorage.getItem('TOKEN')) {
    //     return true
    // } else {
    //     return false
    // }
    return false
}
class PrivateRoute extends React.Component {
    render() {
        const Component = this.props.component
        const props = this.props
        if(isAuth()) {
            return ( <Route render={() => <Component {...props} /> }/> )
        } else {
            return ( <Redirect to="/login"/> )
        }
    }
}

const Router = () => {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={AsyncAbout} compPath="./pages/About" />            
            <PrivateRoute path="/tweetsPrivate" exact component={AsyncListTweets} compPath="./pages/ListTweets"/>
            <Route path="/tweets" exact component={AsyncListTweets} compPath="./pages/ListTweets"/>
            <Route exact path="/logout" render={() => (<Redirect to="/" />) } />
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Router