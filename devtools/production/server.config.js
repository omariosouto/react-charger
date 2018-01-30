// Node Stuff
import path from 'path'
// Server Stuff
import Express from 'express'
// React Stuff
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet'
import App from '../../src/App'
// Router stuff
import { StaticRouter, matchPath } from 'react-router-dom'
import { routes } from '../../src/routes';
// Isomorphic Stuff
import serialize from "serialize-javascript";
import "isomorphic-fetch"

const app = new Express()
app.use(Express.static(path.join(__dirname, '../', '../', 'dist')));


app.get('*', (req, res) => {
    serverSideRender(req, res)
})

function serverSideRender(request, response) {
    response.set('Content-Type','text/html');
    console.log(request.url)
    // # Current Component that will be rendered
    // 1 - Render just Component
        //const component = renderToString(<App />)
        // res.send(component) // => Envia um HTML já pronto

    // 2 - Render with Routes
    const routesArray = routes.props.children.map( route => route )
    const activeRoute = routesArray.find( route => route.props.path.match(new RegExp(`\^${request.url}\$`)) ? route : false )
    if(activeRoute) {
        const requestInitialData = activeRoute.props.component.requestInitialData && activeRoute.props.component.requestInitialData()

        Promise.resolve(requestInitialData)
        .then(initialData => {
            const context = { initialData } || {}
            const component = renderToString(
                appTemplateWithStaticRouter({ url: request.url, routes, context })
            )
            response.send(htmlTemplate(component, initialData))
        })
    }
}

function appTemplateWithStaticRouter({ url, routes, context }) {
    return (
        <StaticRouter location={url} context={context}>
        { routes }   
        </StaticRouter>
    )
}

function htmlTemplate (component, initialData) {
    // HTML Template
    const head = Helmet.rewind();
    const assets = webpackIsomorphicTools.assets()
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            ${head.title.toString()}
            ${head.meta.toString()}
            ${head.link.toString()}
            <link rel="stylesheet" href="${assets.styles.main}">
            <script>window.__innitialData__ = ${serialize(initialData)}</script>
        </head>
        <body>
            <div id="root">
                ${component}
            </div>
            <script src=${ assets.javascript.vendor} charSet="UTF-8"></script>
            <script src=${assets.javascript.main} charSet="UTF-8"></script>
        </body>
        </html>
    `
    return html
}






app.listen(3001, () => console.log('Servidor subiu com sucesso!'))

// console.log(webpackIsomorphicTools.assets())