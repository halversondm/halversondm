/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import React from "react";
import $ from "jquery";

const service = "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&q=";
const myBlog = "http://tech-dan.blogspot.com/feeds/posts/default";

const Blog = React.createClass({

  getInitialState() {
    return {feeds: [], filteredData: []};
  },

  componentDidMount() {
    const url = service + encodeURIComponent(myBlog);
    $.ajax({
      url: url,
      dataType: "jsonp"
    }).done(response => {
      this.setState({feeds: response.responseData.feed.entries, filteredData: response.responseData.feed.entries});
    });
  },

  createMarkup(html) {
    return {__html: html};
  },

  filterData(event) {
    const regex = new RegExp(event.target.value, "i");
    const filtered = this.state.feeds.filter(data => {
      return data.content.search(regex) > -1;
    });
    this.setState({filteredData: filtered});
  },

  render() {
    return (
      <div>
        <h2 className="text-primary">Dan Tech</h2>
        <p>A technology focused blog that I write on <a
          href="//tech-dan.blogspot.com" target="_blank">Blogger</a>.</p>
        <div className="input-prepend">
          <span className="add-on"><i className="icon-search" /></span>
          <input className="span12" type="text" placeholder="Search" onChange={this.filterData} />
          <span className="badge badge-warning"
                hidden={this.state.filteredData.length === this.state.feeds.length}>
            {this.state.filteredData.length} Items</span>
        </div>
        <div style={{height: "20px"}}></div>
        {
          this.state.filteredData.map((feed, i) => {
            return <div className="panel panel-info" key={i}>
              <div className="panel-heading">
                <h3 className="panel-title"><a href={feed.link}
                                               target="_blank">{feed.title}</a>
                </h3>
              </div>
              <div className="panel-body">
                <p className="text-left"
                   dangerouslySetInnerHTML={this.createMarkup(feed.content)} />
                <span className="small">{feed.publishedDate}</span>
              </div>
            </div>;
          })
        }
      </div>
    );
  }

});

export default Blog;
