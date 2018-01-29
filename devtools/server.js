const path = require('path');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools =
    new WebpackIsomorphicTools(
        require('./isomorphictools.config')
    )
    .server(
        path.resolve(__dirname, '..'),
        () => {
            require(`./${process.env.NODE_ENV}/server.config.js`)
        }
    );