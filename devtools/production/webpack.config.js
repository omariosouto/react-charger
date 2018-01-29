const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const srcPath = path.join(__dirname, '../', '../', '/src/');
const distPath = path.join(__dirname, '../', '../', '/dist/');
const webpackIsomorphicTools = new WebpackIsomorphicToolsPlugin(require('../isomorphictools.config'));


module.exports = {
    context: path.join(__dirname, '..', '..'),
    entry: {
        main: [
            'babel-polyfill',
            srcPath + 'index'
        ]
    },
    output: {
        path: distPath,
        filename: 'js/[chunkhash].[name].js',
        publicPath: '/'
    },
    module: {
    rules: [
        {
          test: /\.js$/,
          include: srcPath,
          exclude: /node_modules/,
          use: 'babel-loader',
          
        }, {
          test: webpackIsomorphicTools.regular_expression('images'),
          use: [{
            loader: 'url-loader',
            options: { limit: 8192, name: 'images/[name].[ext]' }
          }, {
            loader: 'img-loader'
          }]
        }, {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({ fallback: "style-loader", use: [{ loader: "css-loader", options: { minimize: true } }]})
        }, {
          test: /\.svg$/,
          include: srcPath,
          use: [{
            loader: 'url-loader',
            options: { limit: 8192, name: 'svg/[name].[ext]', mimetype: 'image/svg+xml' }
          }, {
            loader: 'img-loader'
          }]
        }, {
          test: /\.svg(\?[\s\S]+)?$/,
          exclude: srcPath,
          use: [{
            loader: 'url-loader',
            options: { limit: 8192, name: 'fonts/[name].[ext]', mimetype: 'image/svg+xml' }
          }]
        }, {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: 'url-loader',
            options: { limit: 8192, name: 'fonts/[name].[ext]' }
          }]
        }
    ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { 'NODE_ENV': JSON.stringify('production') }
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
        new UglifyJsPlugin(),
        new ExtractTextPlugin("[chunkhash].styles.css"),
        webpackIsomorphicTools
    ],
}