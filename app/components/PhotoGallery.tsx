/**
 * Created by Daniel on 6/28/2016.
 */
"use strict";

import * as React from "react";
import {Modal} from "react-bootstrap";

export interface PhotoGalleryProps {
    perPage: number,
    totalPhotos: number,
    filePrefix: string,
    fileSuffix: string
}

interface PhotoGalleryState {
    photoArray: Array<string>,
    pages: Array<string>,
    firstPhoto: Array<number>,
    lastPhoto: Array<number>,
    hidePrevious: boolean,
    hideNext: boolean,
    showModal: boolean,
    photoIndex: number
}

export default class PhotoGallery extends React.Component<PhotoGalleryProps, PhotoGalleryState> {

    constructor(props: PhotoGalleryProps) {
        super(props);
        this.state = {
            photoArray: [],
            pages: [],
            firstPhoto: [],
            lastPhoto: [],
            hidePrevious: false,
            hideNext: false,
            showModal: false,
            photoIndex: 0
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
        let go = true;
        let page = 0;
        let firstPhoto = [];
        let lastPhoto = [];
        let pages = [];
        while (go) {
            if (page === 0) {
                firstPhoto.push(1);
                lastPhoto.push(this.props.perPage);
            } else {
                let nextFirst = lastPhoto[page - 1] + 1;
                let nextLast = nextFirst + this.props.perPage;
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
        let photoArray = [];
        for (let i = firstPhoto[pageNumber - 1]; i <= lastPhoto[pageNumber - 1]; i += 1) {
            let source = this.props.filePrefix + i + this.props.fileSuffix;
            photoArray.push(source);
        }
        this.setState({photoArray: photoArray});
    }

    imageClick(event) {
        let photoIndex = Number(event.currentTarget.dataset.i);
        this.showHideButtons(photoIndex);
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

    prev() {
        let photoIndex = this.state.photoIndex - 1;
        this.showHideButtons(photoIndex);
    }

    next() {
        let photoIndex = this.state.photoIndex + 1;
        this.showHideButtons(photoIndex);
    }

    showHideButtons(photoIndex) {
        let hideNext = photoIndex === (this.state.photoArray.length - 1);
        let hidePrevious = photoIndex === 0;
        this.setState({
            hideNext: hideNext,
            hidePrevious: hidePrevious,
            photoIndex: photoIndex
        });
    }

    pageClick(event) {
        let page = Number(event.currentTarget.dataset.id);
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
