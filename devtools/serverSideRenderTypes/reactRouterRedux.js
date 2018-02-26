// Node Stuff
import path from 'path'
require("require.async")(require);

// React Stuff
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// Router Stuff
import { StaticRouter, Route } from 'react-router-dom'
import Routes from '../../src/routes';

// Redux Stuff
import { configureStore } from '../../src/store'
import { Provider } from 'react-redux'

// SSR Stuff
import htmlTemplate from './commons/htmlTemplate'
import initialDataResolver from './commons/initialDataResolver'

import Home from '../../src/pages/Home'

function renderComponent({
        Component,
        store
    }, request, response) {
    const promises = []
    Home.componentInitialData().forEach((func) => {
        promises.push( Promise.resolve(store.dispatch(func())) )
    })

    Promise.all(promises)
            .then(() => {
                const initialData = store.getState()
                const context = { initialData }
                const applicationServerLoaded = renderToString(
                    <Provider store={store}>
                        <StaticRouter location={request.url} context={context}>
                            <Route path={request.url} component={Component} />
                        </StaticRouter>
                    </Provider>
                )

                htmlTemplate(applicationServerLoaded, initialData).then( html => {
                    response.send(html)
                })
            })


}

export default (request, response) => {
    console.log('SSR React com React Router e Redux')

    // Carregar a store no servidor
    const store = configureStore()

    const routesArray = Routes().props.children.map( route => route )
    let activeRoute = routesArray.find( route => route.props.path.match(new RegExp(`\^${request.url}\$`)) ? route : false )
    if(!activeRoute) { // Set 404 Route
        activeRoute = routesArray.find( route => route.props.path.match(/\*/) ? route : false )
    }
    if(activeRoute.props.render) { // Set Redirect
        if(activeRoute.props.render().props.to) {
            response.redirect(activeRoute.props.render().props.to)
        }
    } 
    if(activeRoute) {
        if(activeRoute.props.compPath) { // Load Async
            let componentPath = path.resolve(__dirname, '..', '..', 'src', activeRoute.props.compPath)
            require.async(componentPath, function(info) {
                const Component = info.default
                renderComponent({
                    Component,
                    store
                }, request, response)
            })
        } else { // Load Current
            const Component = activeRoute.props.component 
            renderComponent({
                Component,
                store
            }, request, response)
        }

    } else { // You must create a component for 404 route with path '*'
        response.send("You must create a component for 404 route with path '*'.")
    }
}
