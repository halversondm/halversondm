'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: [
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new CopyWebpackPlugin([
      {from: "app/images/", to: "images/"}, {
        from: "app/extras"
      }
    ]),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      favicon: 'app/favicon.ico',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: "babel"
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.(ttf|eot|woff2|svg|png|woff|php)$/,
      loader: "file-loader"
    }, {
      test: /\.(jpg|jpeg)$/,
      loader: "file-loader?name=images/[name].[ext]"
    }]
  }
};
