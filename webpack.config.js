"use strict";

import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config = {
  devtool: "eval",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.resolve(__dirname, "app/main.js")
  ],
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].js",
    publicPath: "/"
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: "app/images/", to: "images/"}, {
        from: "app/extras"
      }
    ]),
    new HtmlWebpackPlugin({
      template: "app/index.tpl.html",
      inject: "body",
      favicon: "app/favicon.ico",
      filename: "index.html"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: "babel"},
      {test: /\.json?$/, loader: "json"},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {
        test: /\.(ttf|eot|woff2|svg|png|woff)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  }
};

module.exports = config;
