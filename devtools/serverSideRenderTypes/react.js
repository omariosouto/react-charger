// React Stuff
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import App from '../../src/App'

// SSR Stuff
import htmlTemplate from './commons/htmlTemplate'


export default (request, response) => {
    console.log('SSR React puro')
    const component = renderToString(<App />)
    const ssrHTML = htmlTemplate(component)
    
    ssrHTML.then( html => {
        response.send(html)
    })
}
