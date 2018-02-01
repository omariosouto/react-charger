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
// Redux Stuff
import { configureStore } from '../../src/store'
import { Provider } from 'react-redux'
import { readFile } from 'fs';

const app = new Express()
app.use(Express.static(path.join(__dirname, '../', '../', 'dist')));



console.log('Path of file in parent dir:', path.resolve(__dirname, '..','..','public','index.html'));

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
    // const routesArray = routes.props.children.map( route => route )
    // const activeRoute = routesArray.find( route => route.props.path.match(new RegExp(`\^${request.url}\$`)) ? route : false )
    // if(activeRoute) {
    //     const requestInitialData = activeRoute.props.component.requestInitialData && activeRoute.props.component.requestInitialData()
    //     // Promise.resolve(requestInitialData)

    //     initialDataResolver(requestInitialData)
    //     .then(initialData => {
    //         const context = { initialData }
    //         const component = renderToString(
    //             appTemplateWithStaticRouter({ url: request.url, routes, context })
    //         )
    //         response.send(htmlTemplate(component, initialData))
    //     })
    // }

    // 3 - With React Router and Redux
    const store = configureStore()
    const routesArray = routes.props.children.map( route => route )
    const activeRoute = routesArray.find( route => route.props.path.match(new RegExp(`\^${request.url}\$`)) ? route : false )
    
    if(activeRoute) {
        const promises = []
        if(activeRoute.props.component.requestInitialData) {
            const requestInitialData = activeRoute.props.component.requestInitialData
            promises.push( Promise.resolve(store.dispatch(requestInitialData())) )
        }

        Promise.all(promises)
               .then(() => {
                    const initialData = store.getState()
                    const context = { initialData }
                    const component = renderToString(
                        <Provider store={store}>
                        { appTemplateWithStaticRouter({ url: request.url, routes, context }) }
                        </Provider>
                    )
                    htmlTemplate(component, initialData).then( html => {
                        response.send(html)
                    })
                })
    }
}


function initialDataResolver(initialDataFromUser) {     
     const PromisesFromInitialData = []
     for(let item in initialDataFromUser) {
         PromisesFromInitialData.push(initialDataFromUser[item])
     }
         
     return Promise.all(PromisesFromInitialData)
            .then((promissesReturn) => {
                const initialDataFromServer = {}
                let i = -1;
                for( let item in initialDataFromUser ) {
                   i++
                   initialDataFromServer[item] = promissesReturn[i]
                }
                return initialDataFromServer
             });    
}

export function appTemplateWithStaticRouter({ url, routes, context }) {
    return (
        <StaticRouter location={url} context={context}>
        { routes }   
        </StaticRouter>
    )
}

export function htmlTemplate (component = '', initialData) {
    const publicHTML = path.resolve(__dirname, '..','..','public','index.html')
    // HTML Template
    const head = Helmet.rewind();
    const assets = webpackIsomorphicTools.assets()

    return new Promise((resolve, reject) => {
        readFile(publicHTML, function(err, data) {
            if(err) { reject(err) }
            const template = data.toString()
            const headInfo = extractHeadInfo(template)

                const html = `<!DOCTYPE html>
                <html>
                <head>
                    ${head.title.toString()}
                    ${head.meta.toString()}
                    ${head.link.toString()}
                    <link rel="stylesheet" href="${assets.styles.main}" />
                    ${ process.env.NODE_ENV === 'production' ? '<script src="./service-worker.js"></script>' : ' ' }
                    <script>window.__innitialData__ = ${serialize(initialData)};</script>
                    ${ headInfo }
                </head>
                <body>
                    <div id="root">${component}</div>
                    ${assets.javascript.vendor ? `<script src="${assets.javascript.vendor}"></script>` : ' '}
                    ${assets.javascript.main ? `<script src="${assets.javascript.main}"></script>` : ' '}
                </body>
                </html>
            `
            resolve(html)
        })
    })
}


function extractHeadInfo(template) {
    return template.match(/<head>([\w\W]*)<\/head>/)
                    .join('')
                    .replace(/<\/?head>/g, '')
                    .replace(/%PUBLIC_URL%/g, '')
                    .replace(/<title>([\w\W]*)<\/title>/, '')
                    .replace(/<!--[^>]*-->/g, '')
                    .trim()
}





app.listen(3001, () => console.log('Servidor subiu com sucesso!'))

// console.log(webpackIsomorphicTools.assets())