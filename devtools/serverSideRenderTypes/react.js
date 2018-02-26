// React Stuff
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import App from '../../src/App'

// Router Stuff
import { StaticRouter, Route } from 'react-router-dom'

// SSR Stuff
import htmlTemplate from './commons/htmlTemplate'
import initialDataResolver from './commons/initialDataResolver'

export default (request, response) => {
    console.log('SSR React puro')

    const componentInitialData = App.componentInitialData || (function() {})

    initialDataResolver(componentInitialData(request))
        .then(initialData => {
            const context = { initialData }
            const componentAsString = renderToString(
                <StaticRouter location={request.url} context={context}>
                    <Route path="/" component={App} />
                </StaticRouter>
            )
            const ssrHTML = htmlTemplate(componentAsString, initialData)
    
            ssrHTML.then( html => {
                response.send(html)
            })
        })
}
