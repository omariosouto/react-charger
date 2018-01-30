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
import StaticRouter from 'react-router-dom/StaticRouter'
import { routes } from '../../src/routes';

const app = new Express()
app.use(Express.static(path.join(__dirname, '../', '../', 'dist')));
app.get('*', (req, res) => {
    serverSideRender(req, res)
})

function serverSideRender(request, response) {
    response.set('Content-Type','text/html');
    
    // # Current Component that will be rendered
    // 1 - Render just Component
        //const component = renderToString(<App />)
    // 2 - Render with Routes
    const context = {}
    const component = renderToString((
        <StaticRouter location={request.url} context={context}>
         { routes }   
        </StaticRouter>
    ))
    
    // HTML Template
    const head = Helmet.rewind();
    const assets = webpackIsomorphicTools.assets()
    const html = `
        <html>
        <head>
            ${head.title.toString()}
            ${head.meta.toString()}
            ${head.link.toString()}
            <link rel="stylesheet" href="${assets.styles.main}">
        </head>
        <body>
            <div id="root">
                ${component}
            </div>
        </body>
        </html>
    `

    response.send(html)
}






app.listen(3001, () => console.log('Servidor subiu com sucesso!'))

// console.log(webpackIsomorphicTools.assets())