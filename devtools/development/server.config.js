import path from 'path';
import Express from 'express'
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { htmlTemplate } from '../production/server.config'

function loadDevServer(port) {
    const app = Express();
    const host = process.env.HOST || 'localhost';
    const compiler = webpack(webpackConfig(port));
    const serverOptions = {
      contentBase: 'http://' + host + ':' + port,
      quiet: true,
      noInfo: true,
      hot: true,
      inline: true,
      lazy: false,
      historyApiFallback: true,
      compress: false,
      publicPath: 'http://' + host + ':' + port,
      headers: { 'Access-Control-Allow-Origin': '*' },
      stats: { colors: true }
    };
  
    app.use(webpackDevMiddleware(compiler, serverOptions));
    app.use(webpackHotMiddleware(compiler));
    app.use('*', function (req, res, next) {
      res.set('Content-Type','text/html');
      res.send(htmlTemplate());
      res.end();
    });
    app.listen(port, (err) => {
      if (err) console.error(`Error: ${err}`);
  
      console.info(`Server Bootstrap Successful! Open http://${host}:${port} to see the Development Environment`);
    });
  }

loadDevServer(4600)