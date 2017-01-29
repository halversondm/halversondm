"use strict";
import "./bootswatch/css/bootstrap.css";
import "./main.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouter from "react-router";
import App from "./components/App";
import Home from "./components/Home";
import About from "./components/About";
import Blog from "./components/Blog";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Auto from "./components/Auto";
import Honda from "./components/Honda";
import Yamaha from "./components/Yamaha";
import Charger from "./components/Charger";
import GrandPrix from "./components/GrandPrix";
import Applications from "./components/Applications";
import ABC from "./components/ABC";
import Base64 from "./components/Base64";
import DiscountCalculator from "./components/DiscountCalculator";
import Grades from "./components/Grades";
import Game from "./components/Game";
import StockQuote from "./components/StockQuote";
import UrlBuilder from "./components/UrlBuilder";

ReactDOM.render(
    <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path="/" component={App}>
            <ReactRouter.IndexRoute component={Home}/>
            <ReactRouter.Route path="/home" component={Home}/>
            <ReactRouter.Route path="/about" component={About}/>
            <ReactRouter.Route path="/blog" component={Blog}/>
            <ReactRouter.Route path="/resume" component={Resume}/>
            <ReactRouter.Route path="/contact" component={Contact}/>
            <ReactRouter.Route path="/auto" component={Auto}/>
            <ReactRouter.Route path="/honda" component={Honda}/>
            <ReactRouter.Route path="/yamaha" component={Yamaha}/>
            <ReactRouter.Route path="/charger" component={Charger}/>
            <ReactRouter.Route path="/grandprix" component={GrandPrix}/>
            <ReactRouter.Route path="/apps" component={Applications}/>
            <ReactRouter.Route path="/abc" component={ABC}/>
            <ReactRouter.Route path="/base64" component={Base64}/>
            <ReactRouter.Route path="/discountCalculator" component={DiscountCalculator}/>
            <ReactRouter.Route path="/grades" component={Grades}/>
            <ReactRouter.Route path="/game" component={Game}/>
            <ReactRouter.Route path="/stockQuote" component={StockQuote}/>
            <ReactRouter.Route path="/urlBuilder" component={UrlBuilder}/>
        </ReactRouter.Route>
    </ReactRouter.Router>, document.getElementById("root"));
