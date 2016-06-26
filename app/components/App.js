/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import React from "react";
import { Link } from "react-router";

let App = React.createClass({

  render() {
    return (
      <div>
        <div className="header">
          <div className="navbar navbar-default navbar-fixed-top" role="navigation">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#js-navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <div className="navbar-brand">@halversondm</div>
              </div>
              <div className="collapse navbar-collapse" id="js-navbar-collapse">
                <ul className="nav navbar-nav">
                  <li><Link to="/home">Home</Link></li>
                  <li><Link to="/apps">Apps</Link></li>
                  <li><Link to="/auto">Auto</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/resume">Resume</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="theme-showcase container">
          {this.props.children}
          <hr />
          <footer>
            <p>&copy; 2016 dmhweb.org</p>
          </footer>
        </div>
      </div>);
  }
});

export default App;