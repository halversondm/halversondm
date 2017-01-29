"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

console.log("Node environment ", process.env.NODE_ENV);

if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "production") {
    throw new Error("NODE_ENV is required, values are 'development' or 'production'");
}

const config = {
    //bail: true,
    entry: [
        path.resolve(__dirname, "app/main.tsx")
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[hash].min.js",
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "app/index.tpl.html",
            inject: "body",
            filename: "index.html"
        }),
        new ExtractTextPlugin("[name]-[hash].min.css"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new CopyWebpackPlugin([
            {from: "app/images/", to: "images/"}, {
                from: "app/extras"
            }, {from: "app/runtime"}
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        })
    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: "babel"
        }, {
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader"
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style", "css")
        }, {
            test: /\.(ttf|eot|woff2|svg|png|woff|php)$/,
            loader: "file-loader?name=assets/[name].[ext]"
        }, {
            test: /\.(jpg|jpeg)$/,
            loader: "file-loader?name=images/[name].[ext]"
        }]
    }
};

module.exports = config;
