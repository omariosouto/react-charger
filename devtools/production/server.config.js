// Node Stuff
import path from 'path'
require("require.async")(require);
// Server Stuff
import Express from 'express'
import cookieParser from 'cookie-parser'
// Server Side Render Stuff
import "isomorphic-fetch"
import packageJson from '../../package.json'

const app = new Express()
app.use(cookieParser())
app.use(Express.static(path.join(__dirname, '../', '../', 'dist')));

app.get('*', (req, res) => {
    serverSideRender(req, res)
})

function serverSideRender(request, response) {
    response.set('Content-Type','text/html');
    console.log('URL:', request.url)
    console.log(request.cookies)

    const ssrType = path.resolve(__dirname, '..', 'serverSideRenderTypes', packageJson.ssr)
    require.async(ssrType, (ssrFunction) => {
        ssrFunction.default(request, response)
    })

}

const port = process.env.PORT || 4600

app.listen(port, () => console.log('Servidor subiu com sucesso!', process.env.PORT))

