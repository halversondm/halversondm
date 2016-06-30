/* eslint no-console: 0 */
import path from "path";
import express from "express";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "./webpack.config.js";
import morgan from "morgan";

const isDeveloping = process.env.NODE_ENV !== "production";
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(morgan("dev"));

if (isDeveloping) {
  const compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: "src",
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(__dirname + "/dist"));
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.listen(port, "localhost", (err) => {
  if (err) {
    console.log(err);
  }
  console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});
