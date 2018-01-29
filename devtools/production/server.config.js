import path from 'path'
// Server Stuff
import Express from 'express'
// React Stuff
import React from 'react'
import App from '../../src/App'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

const app = new Express()
app.use(Express.static(path.join(__dirname, '../', '../', 'dist')));
app.get('/', (req, res) => {
    reactSsrSample(res)
})


function reactSsrSample(response) {
    response.set('Content-Type','text/html');
    const component = renderToString(<App />)
    const assets = webpackIsomorphicTools.assets()
    const html = `
        <html>
        <head>
            <link rel="stylesheet" href="${assets.styles.main}">
        </head>
        <body>
            ${component}
        </body>
        </html>
    `
    response.send(html)
}

app.listen(3001, () => console.log('Servidor subiu com sucesso!'))

// console.log(webpackIsomorphicTools.assets())