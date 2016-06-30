/**
 * Created by Daniel on 6/28/2016.
 */
"use strict";

import React from "react";

const PhotoGallery = React.createClass({

  propTypes: {
    perPage: React.PropTypes.number,
    totalPhotos: React.PropTypes.number,
    filePrefix: React.PropTypes.string,
    fileSuffix: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      perPage: 0,
      totalPhotos: 0,
      filePrefix: "",
      fileSuffix: ""
    };
  },
  getInitialState() {
    return {
      photoArray: [],
      buttons: [],
      firstPhoto: [],
      lastPhoto: [],
      hidePrevious: false,
      hideNext: false
    };
  },
  componentDidMount() {
    this.init();
  },
  init() {
    var go = true;
    var page = 0;
    var firstPhoto = [];
    var lastPhoto = [];
    var buttons = [];
    while (go) {
      if (page === 0) {
        firstPhoto.push(1);
        lastPhoto.push(this.props.perPage);
      } else {
        var nextFirst = lastPhoto[page - 1] + 1;
        var nextLast = nextFirst + this.props.perPage;
        if (nextLast > this.props.totalPhotos) {
          nextLast = this.props.totalPhotos;
        }
        firstPhoto.push(nextFirst);
        lastPhoto.push(nextLast);
      }

      buttons.push(page + 1);
      if (lastPhoto[page] === this.props.totalPhotos) {
        go = false;
      } else {
        page += 1;
      }
    }
    this.setState({
      buttons: buttons,
      firstPhoto: firstPhoto,
      lastPhoto: lastPhoto
    });
    this.buildArray(1, firstPhoto, lastPhoto);
  },
  buildArray(pageNumber, firstPhoto, lastPhoto) {
    var photoArray = [];
    for (var i = firstPhoto[pageNumber - 1]; i <= lastPhoto[pageNumber - 1]; i += 1) {
      var source = this.props.filePrefix + i + this.props.fileSuffix;
      photoArray.push(source);
    }
    this.setState({photoArray: photoArray});
  },
  click(pageNumber) {
    this.buildArray(pageNumber, this.state.firstPhoto, this.state.lastPhoto);
  },
  clickAction(event) {
    var photoIndex = Number(event.currentTarget.dataset.i);
    this.showHideButtons(photoIndex);
  },
  prev() {
    var photoIndex = this.state.photoIndex - 1;
    this.showHideButtons(photoIndex);
  },
  next() {
    var photoIndex = this.state.photoIndex + 1;
    this.showHideButtons(photoIndex);
  },
  showHideButtons(photoIndex) {
    var hideNext = photoIndex === (this.state.photoArray.length - 1);
    var hidePrevious = photoIndex === 0;
    this.setState({
      hideNext: hideNext,
      hidePrevious: hidePrevious,
      photoIndex: photoIndex
    });
  },
  render() {
    return <div id="photoGallery">
      <ul className="row">
        {
          this.state.photoArray.map((photo, i) => {
            return <li key={i} className="col-lg-2 col-md-2 col-sm-3 col-xs-4">
              <img onClick={this.clickAction} data-i={i}
                   className="img-responsive" data-toggle="modal"
                   data-target="#photoModal"
                   src={photo}/>
            </li>;
          })
        }
      </ul>
      <div id="photoModal" className="modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <img src={this.state.photoArray[this.state.photoIndex]}
                   className="img-responsive"/>
            </div>
            <div className="modal-footer">
              <ul className="pager">
                <li className="previous">
                  <input type="button" hidden={this.state.hidePrevious}
                         onClick={this.prev} value="&larr; Previous"/>
                </li>
                <li className="next">
                  <input type="button" hidden={this.state.hideNext}
                         onClick={this.next} value="Next &rarr;"/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
});

export default PhotoGallery;
