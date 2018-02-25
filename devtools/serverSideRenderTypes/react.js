// React Stuff
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import App from '../../src/App'

// SSR Stuff
import htmlTemplate from './commons/htmlTemplate'
import initialDataResolver from './commons/initialDataResolver'


export default (request, response) => {
    console.log('SSR React puro')
    const component = renderToString(<App />)
    
    const componentInitialData = App.componentInitialData()

    initialDataResolver(componentInitialData)
        .then(initialData => {
            const ssrHTML = htmlTemplate(component, initialData)
    
            ssrHTML.then( html => {
                response.send(html)
            })
        })
}
