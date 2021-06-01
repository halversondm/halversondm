/**
 * Created by Daniel on 6/28/2016.
 */
import * as React from "react";
import {Button, Modal, Row} from "react-bootstrap";

export interface PhotoGalleryProps {
    perPage: number;
    totalPhotos: number;
    filePrefix: string;
    fileSuffix: string;
}

export interface PhotoGalleryState {
    photoArray: string[];
    pages: string[];
    firstPhoto: number[];
    lastPhoto: number[];
    hidePrevious: boolean;
    hideNext: boolean;
    showModal: boolean;
    photoIndex: number;
}

export class PhotoGallery extends React.Component<PhotoGalleryProps, PhotoGalleryState> {

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
            photoIndex: 0,
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
        const firstPhoto = [];
        const lastPhoto = [];
        const pages = [];
        while (go) {
            if (page === 0) {
                firstPhoto.push(1);
                lastPhoto.push(this.props.perPage);
            } else {
                const nextFirst = lastPhoto[page - 1] + 1;
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
            pages,
            firstPhoto,
            lastPhoto,
        });
        this.buildArray(1, firstPhoto, lastPhoto);
    }

    buildArray(pageNumber, firstPhoto, lastPhoto) {
        const photoArray = [];
        for (let i = firstPhoto[pageNumber - 1]; i <= lastPhoto[pageNumber - 1]; i += 1) {
            const source = this.props.filePrefix + i + this.props.fileSuffix;
            photoArray.push(source);
        }
        this.setState({photoArray});
    }

    imageClick(event) {
        const photoIndex = Number(event.currentTarget.dataset.i);
        this.showHideButtons(photoIndex);
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

    prev() {
        const photoIndex = this.state.photoIndex - 1;
        this.showHideButtons(photoIndex);
    }

    next() {
        const photoIndex = this.state.photoIndex + 1;
        this.showHideButtons(photoIndex);
    }

    showHideButtons(photoIndex) {
        const hideNext = photoIndex === (this.state.photoArray.length - 1);
        const hidePrevious = photoIndex === 0;
        this.setState({
            hideNext,
            hidePrevious,
            photoIndex,
        });
    }

    pageClick(event) {
        const page = Number(event.currentTarget.dataset.id);
        this.buildArray(page, this.state.firstPhoto, this.state.lastPhoto);
    }

    render() {
        return (
            <div id="photoGallery">
                <ul className="row">
                    {
                        this.state.photoArray.map((photo, i) => {
                            return <li key={i} className="col-md-2 col-lg-2 col-sm-3 col-xs-4">
                                <img onClick={this.imageClick} data-i={i}
                                     className="img-fluid"
                                     src={photo}/>
                            </li>;
                        })
                    }
                </ul>
                <Row>
                    {
                        this.state.pages.map((page, i) => {
                            return <div key={i}><Button data-id={page} variant="primary"
                                                        onClick={this.pageClick}>{"Page " + page}</Button></div>;
                        })
                    }
                </Row>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Body>
                        <img src={this.state.photoArray[this.state.photoIndex]}
                             className="img-fluid"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <ul className="pager">
                            <li className="previous">
                                <Button variant="primary" hidden={this.state.hidePrevious}
                                        onClick={this.prev}>&larr; Previous</Button>
                            </li>
                            <li className="next">
                                <Button variant="primary" hidden={this.state.hideNext}
                                        onClick={this.next}>Next &rarr;</Button>
                            </li>
                        </ul>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
