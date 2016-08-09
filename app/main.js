"use strict";
import React from "react";
import {render} from "react-dom";
import "./bootswatch/dist/bootstrap.css";
import "./main.css";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
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
import RPSLS from "./components/RPSLS";
import StockQuote from "./components/StockQuote";
import UrlBuilder from "./components/UrlBuilder";

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/home" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/blog" component={Blog} />
      <Route path="/resume" component={Resume} />
      <Route path="/contact" component={Contact} />
      <Route path="/auto" component={Auto} />
      <Route path="/honda" component={Honda} />
      <Route path="/yamaha" component={Yamaha} />
      <Route path="/charger" component={Charger} />
      <Route path="/grandprix" component={GrandPrix} />
      <Route path="/apps" component={Applications} />
      <Route path="/abc" component={ABC} />
      <Route path="/base64" component={Base64} />
      <Route path="/discountCalculator" component={DiscountCalculator} />
      <Route path="/grades" component={Grades} />
      <Route path="/rpsls" component={RPSLS} />
      <Route path="/stockQuote" component={StockQuote} />
      <Route path="/urlBuilder" component={UrlBuilder} />
    </Route>
  </Router>, document.getElementById("root"));
