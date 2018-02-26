import React from 'react'
import { Switch, Route } from 'react-router-dom'
import asyncComponent from './components/AsyncComponent'


// Pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'
const AsyncAbout = asyncComponent(() => import("./pages/About")); // This component will be loaded async :)
const AsyncListTweets = asyncComponent(() => import("./pages/ListTweets")); // This component will be loaded async :)
// Colocar private route que acessa os cookies e valida algo

const Router = () => {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={AsyncAbout} />            
            <Route path="/tweets" component={AsyncListTweets}/>
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Router