// - fazer com duas rotas e uma sendo lazyLoaded: OK 
// - Fazer rota de 404: FALTOU
// - Fazer teste de redirect pra Home: FALTOU
// - Fazer rota com autenticação que sempre da true (Tweets): FALTOU

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
    console.log('SSR React com React Router')

    const componentInitialData = App.componentInitialData || (function() {})

    initialDataResolver(componentInitialData())
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
