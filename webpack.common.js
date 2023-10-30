const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "app/main.tsx"),
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.tpl.html",
      inject: "body",
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "app/images/", to: "images/" },
        { from: "app/extras" },
        { from: "app/runtime" },
      ],
    }),
  ],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: { loader: "ts-loader" },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ttf|eot|woff2|svg|png|woff|php)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets",
            publicPath: "/assets",
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /\.(jpg|jpeg)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "images",
            publicPath: "/images",
            name: "[name].[ext]",
          },
        },
      },
    ],
  },
};
