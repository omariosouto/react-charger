// Node Stuff
import path from 'path'
import { readFile } from 'fs';

// Isomorphic Stuff
import serialize from "serialize-javascript";

// React Stuff
import Helmet from 'react-helmet'

export function extractHeadInfo(templateHTMLPure) {
    return templateHTMLPure.match(/<head>([\w\W]*)<\/head>/)
                    .join('')
                    .replace(/<\/?head>/g, '')
                    .replace(/%PUBLIC_URL%/g, '')
                    .replace(/<title>([\w\W]*)<\/title>/, '')
                    .replace(/<!--[^>]*-->/g, '')
                    .trim()
    
}

export default function htmlTemplate(component = '', initialData) {
    const publicHTML = path.resolve(__dirname, '..','..','..','public','index.html')
    // HTML Template
    const head = Helmet.rewind();
    const assets = webpackIsomorphicTools.assets()

    return new Promise((resolve, reject) => {
        readFile(publicHTML, function(err, publicHTMLContent) {
            if(err) { reject(err) }
            const templateHTMLPure = publicHTMLContent.toString()
            const headInfo = extractHeadInfo(templateHTMLPure)

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
