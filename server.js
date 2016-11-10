/* eslint no-console: 0 */
import path from "path";
import express from "express";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "./webpack.config.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
import historyApiFallback from "connect-history-api-fallback";
import http from "http";

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const isDeveloping = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

if (isDeveloping) {
    console.log("Running the 'hot' version of the code");
    const compiler = webpack(config);
    app.use(historyApiFallback({verbose: false}));
    app.use(webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: "app",
        hot: true,
        quiet: false,
        noInfo: false,
        lazy: false,
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
    console.log("Running the 'production' version of the code");
    app.use(express.static(path.resolve(__dirname, "dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
}

app.post("/saveABC", (req, res) => {

    // Potential fields incoming on the request.
    // {
    //   when: String,
    //       antecedent: String,
    //     antecedentOther: String,
    //     location: String,
    //     people: [String],
    //     peopleOther: String,
    //     behavior: [String],
    //     behaviorOther: String,
    //     duration: String,
    //     intensity: String,
    //     consequence: [String],
    //     consequenceOther: String
    // }

    var abc = req.body;
    Object.keys(abc).forEach(key => {
        if (abc[key] === "") {
            delete abc[key];
        }
    });
    console.log(abc);

    var params = {
        TableName: "ABC",
        Item: abc
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(data);
            res.send("ABC Saved!");
        }
    });
});

app.post("/mail.php", (req, res) => {
    console.log(req.body);
    res.send("Email Success!");
});

app.post("/stock", (request, response) => {

    var options = {
        hostname: "dev.markitondemand.com",
        port: 80,
        path: "/MODApis/Api/v2/Quote/json?&symbol=" + request.query.stockSymbol,
        method: "GET",
    };

    var proxyRequest = http.request(options, (proxyResponse) => {
        console.log(`STATUS: ${proxyResponse.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(proxyResponse.headers)}`);
        proxyResponse.setEncoding('utf8');
        proxyResponse.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            response.set("Content-Type", "application/json");
            response.send(chunk);
        });
        proxyResponse.on('end', () => {
            console.log('No more data in response.');
        });
    });

    proxyRequest.on('error', (e) => {
        console.log(`problem with request: ${e}`);
        response.sendStatus(404);
    });
    proxyRequest.end();
});

app.listen(port, "localhost", (err) => {
    if (err) {
        console.log(err);
    }
    console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});
