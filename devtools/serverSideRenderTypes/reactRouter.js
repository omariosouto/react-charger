// - fazer com duas rotas e uma sendo lazyLoaded: OK 
// - Fazer rota de 404: OK
// - Fazer teste de redirect pra Home: FALTOU
// - Fazer rota com autenticação que sempre da true (Tweets): FALTOU

// Node Stuff
import path from 'path'
require("require.async")(require);

// React Stuff
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// Router Stuff
import { StaticRouter, Route } from 'react-router-dom'
import Routes from '../../src/routes';


// SSR Stuff
import htmlTemplate from './commons/htmlTemplate'
import initialDataResolver from './commons/initialDataResolver'

function renderComponent(Component, request, response) {
    const componentInitialData = Component.componentInitialData || (function() {});

    initialDataResolver(componentInitialData())
        .then(initialData => {
            const context = { initialData }
            const componentAsString = renderToString(
                <StaticRouter location={request.url} context={context}>
                    <Route path={request.url} component={Component} />
                </StaticRouter>
            )
            const ssrHTML = htmlTemplate(componentAsString, initialData)
    
            ssrHTML.then( html => {
                response.send(html)
            })
        })
}

export default (request, response) => {
    console.log('SSR React com React Router')

    const routesArray = Routes().props.children.map( route => route )
    let activeRoute = routesArray.find( route => route.props.path.match(new RegExp(`\^${request.url}\$`)) ? route : false )
    if(!activeRoute) {
        activeRoute = routesArray.find( route => route.props.path.match(/\*/) ? route : false )
    }
    if(activeRoute) {
        if(activeRoute.props.compPath) { // Load Async
            let componentPath = path.resolve(__dirname, '..', '..', 'src', activeRoute.props.compPath)
            require.async(componentPath, function(info) {
                const Component = info.default
                renderComponent(Component, request, response)
            })
        } else { // Load Current
            renderComponent(activeRoute.props.component, request, response)
        }

    } else {
        response.send('Page not found')
    }

}
