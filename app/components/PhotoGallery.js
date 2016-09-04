/**
 * Created by Daniel on 6/28/2016.
 */
"use strict";

import React, {Component} from "react";
import Modal from "react-bootstrap/lib/Modal";

class PhotoGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photoArray: [],
            pages: [],
            firstPhoto: [],
            lastPhoto: [],
            hidePrevious: false,
            hideNext: false,
            showModal: false
        };
        this.init = this.init.bind(this);
        this.buildArray = this.buildArray.bind(this);
        this.imageClick = this.imageClick.bind(this);
        this.close = this.close.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.pageClick = this.pageClick.bind(this);
        this.showHideButtons = this.showHideButtons.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    init() {
        var go = true;
        var page = 0;
        var firstPhoto = [];
        var lastPhoto = [];
        var pages = [];
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

            pages.push(page + 1);
            if (lastPhoto[page] === this.props.totalPhotos) {
                go = false;
            } else {
                page += 1;
            }
        }
        this.setState({
            pages: pages,
            firstPhoto: firstPhoto,
            lastPhoto: lastPhoto
        });
        this.buildArray(1, firstPhoto, lastPhoto);
    }

    buildArray(pageNumber, firstPhoto, lastPhoto) {
        var photoArray = [];
        for (var i = firstPhoto[pageNumber - 1]; i <= lastPhoto[pageNumber - 1]; i += 1) {
            var source = this.props.filePrefix + i + this.props.fileSuffix;
            photoArray.push(source);
        }
        this.setState({photoArray: photoArray});
    }

    imageClick(event) {
        var photoIndex = Number(event.currentTarget.dataset.i);
        this.showHideButtons(photoIndex);
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

    prev() {
        var photoIndex = this.state.photoIndex - 1;
        this.showHideButtons(photoIndex);
    }

    next() {
        var photoIndex = this.state.photoIndex + 1;
        this.showHideButtons(photoIndex);
    }

    showHideButtons(photoIndex) {
        var hideNext = photoIndex === (this.state.photoArray.length - 1);
        var hidePrevious = photoIndex === 0;
        this.setState({
            hideNext: hideNext,
            hidePrevious: hidePrevious,
            photoIndex: photoIndex
        });
    }

    pageClick(event) {
        var page = Number(event.currentTarget.dataset.id);
        this.buildArray(page, this.state.firstPhoto, this.state.lastPhoto);
    }

    render() {
        return <div id="photoGallery">
            <ul className="row">
                {
                    this.state.photoArray.map((photo, i) => {
                        return <li key={i} className="col-lg-2 col-md-2 col-sm-3 col-xs-4">
                            <img onClick={this.imageClick} data-i={i}
                                 className="img-responsive"
                                 src={photo}/>
                        </li>;
                    })
                }
            </ul>
            <div className="row">
                {
                    this.state.pages.map((page, i) => {
                        return <button data-id={page} className="btn btn-sm btn-default"
                                       key={i}
                                       onClick={this.pageClick}>{"Page " + page}</button>;
                    })
                }
            </div>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Body>
                    <img src={this.state.photoArray[this.state.photoIndex]}
                         className="img-responsive"/>
                </Modal.Body>
                <Modal.Footer>
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
                </Modal.Footer>
            </Modal>
        </div>;
    }
}

PhotoGallery.propTypes = {
    perPage: React.PropTypes.number,
    totalPhotos: React.PropTypes.number,
    filePrefix: React.PropTypes.string,
    fileSuffix: React.PropTypes.string
};

PhotoGallery.defaultProps = {
    perPage: 0,
    totalPhotos: 0,
    filePrefix: "",
    fileSuffix: ""
};

export default PhotoGallery;
