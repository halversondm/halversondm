/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import React from "react";

const UrlBuilder = React.createClass({
  getInitialState() {
    return {
      queries: [],
      query: {key: "", value: ""},
      baseUrl: "",
      assembledUrl: ""
    };
  },
  addQuery() {
    var queries = this.state.queries;
    queries.push(this.state.query);
    this.setState({queries: queries, query: {key: "", value: ""}});
  },
  assemble() {
    var assembled = this.state.baseUrl + "?";
    var queries = this.state.queries;
    var count = 0;

    queries.forEach(query => {
      count += 1;
      assembled += query.key + "=" + query.value;
      this.setCookie(query.key, query.value);
      if (count < queries.length) {
        assembled += "&";
      }
    });
    this.setCookie("baseUrl", this.state.baseUrl);
    this.setState({assembledUrl: assembled});
  },
  setCookie(cname, value) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + value + "; " + expires;
  },
  launch() {
    var myWindow = window.open("", "MsgWindow", "toolbar=yes, scrollbars=yes, " +
      "resizable=yes, width=1024, height=768");
    myWindow.document.write("<html><head><meta http-equiv=\"X-UA-Compatible\"" +
      " content=\"IE=edge\"></head></head><body><iframe src=\"" + this.state.assembledUrl + "\" width=\"100%\"" +
      " height=\"100%\" /></body></html>\"");
  },
  keyChange(event) {
    var query = this.state.query;
    query.key = event.target.value;
    this.setState({query: query});
  },
  valueChange(event) {
    var query = this.state.query;
    query.value = event.target.value;
    this.setState({query: query});
  },
  baseUrlChange(event) {
    this.setState({baseUrl: event.target.value});
  },
  render() {
    return <div>
      <h2 className="text-primary">URL Builder</h2>
      <h3>Build a URL with query parameters and launch it!</h3>
      <table className="table table-bordered">
        <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        {
          this.state.queries.map((query, i) => {
            return <tr key={i}>
              <td>{query.key}</td>
              <td>{query.value}</td>
            </tr>;
          })
        }
        </tbody>
      </table>
      <hr />
      <fieldset>
        <legend>Add a new query parameter</legend>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="queryKey"
                   className="col-sm-2 control-label">Key</label>
            <div className="col-sm-10">
              <input id="queryKey" value={this.state.query.key} type="text"
                     onChange={this.keyChange} className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="queryValue"
                   className="col-sm-2 control-label">Value</label>
            <div className="col-sm-10">
              <input id="queryValue" value={this.state.query.value}
                     onChange={this.valueChange}
                     type="text" className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-10 col-sm-2">
              <button className="btn btn-primary btn-sm" id="addQuery"
                      onClick={this.addQuery}> + Add Query Parameter
              </button>
            </div>
          </div>
        </form>
      </fieldset>
      <fieldset>
        <legend>Assemble the URL and Launch it</legend>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="baseUrl" className="col-sm-2 control-label">Base
              URL</label>
            <div className="col-sm-10">
              <input id="baseUrl" value={this.state.baseUrl} type="text"
                     className="form-control" onChange={this.baseUrlChange}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-10 col-sm-2">
              <button className="btn btn-primary btn-sm" id="assemble"
                      onClick={this.assemble}>Assemble URL
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="assembledUrl" className="col-sm-2 control-label">Assembled
              URL</label>
            <div className="col-sm-10">
              <textarea id="assembledUrl" rows="4"
                        value={this.state.assembledUrl}
                        className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-10 col-sm-2">
              <button className="btn btn-danger btn-sm" id="launch"
                      onClick={this.launch}>Launch
              </button>
            </div>
          </div>
        </form>
      </fieldset>
    </div>;
  }
});

export default UrlBuilder;
