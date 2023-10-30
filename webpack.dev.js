const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"],
        target: "localhost",
        bypass: function (req, res, proxyOptions) {
          let response;
          if (req.url.indexOf("stock") > -1) {
            response = {
              Symbol: req.query.stockSymbol,
              Name: "string2",
              LastPrice: "string3",
              Timestamp: "string4",
              MarketCap: "string5",
              ChangeYTD: "string6",
              High: "string7",
              Open: "string8",
              Low: "string9",
            };
          } else {
            response = {
              items: [
                {
                  url: "one-url",
                  title: "one-title",
                  content: "one-content",
                  published: new Date(),
                },
              ],
            };
          }
          res.send(response);
        },
      },
    ],
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
});
