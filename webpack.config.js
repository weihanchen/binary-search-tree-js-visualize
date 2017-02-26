const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(__dirname, './src/main.js');
const BUILD_PATH = path.resolve(__dirname, './build');
const INDEX_TEMPLATE_PATH = path.resolve(__dirname, './src/template/index.html');
module.exports = {
   entry: {
      main: ['babel-polyfill', APP_PATH]
   },
   output: {
      path: BUILD_PATH,
      filename: 'bundle.min.js'
   },
   module: {
      loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
         }, {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loaders: ['babel-loader?presets[]=es2015']
         },
         {
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader", "sass-loader"]
         },
         {
            test: /\.(png|jpg)$/,
            loader: 'file-loader'
         }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
         }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
         }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/octet-stream"
         }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader"
         }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=image/svg+xml"
         }
      ]
   },
   plugins: [
      new webpack.optimize.UglifyJsPlugin({
         minimize: true
      }),
      new HtmlWebpackPlugin({
         title: 'binary-search-tree-js-visualize',
         template: INDEX_TEMPLATE_PATH,
         minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
         }
      }),
   ],
   devtool: 'source-map'
}
