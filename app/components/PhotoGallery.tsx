/**
 * Created by Daniel on 6/28/2016.
 */
import * as React from "react";
import { type ReactNode, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";

interface PhotoGalleryProps {
  perPage: number;
  totalPhotos: number;
  filePrefix: string;
  fileSuffix: string;
}

interface PhotoGalleryState {
  photoArray: string[];
  pages: number[];
  firstPhoto: number[];
  lastPhoto: number[];
  hidePrevious: boolean;
  hideNext: boolean;
  showModal: boolean;
  photoIndex: number;
}

export default function PhotoGallery({
  perPage,
  totalPhotos,
  fileSuffix,
  filePrefix,
}: PhotoGalleryProps): ReactNode {
  const [state, setState] = useState<PhotoGalleryState>(init());

  function init(): PhotoGalleryState {
    const localState: PhotoGalleryState = {
      photoArray: [],
      pages: [],
      firstPhoto: [],
      lastPhoto: [],
      hidePrevious: false,
      hideNext: false,
      showModal: false,
      photoIndex: 0,
    };
    let go = true;
    let page = 0;
    while (go) {
      if (page === 0) {
        localState.firstPhoto.push(1);
        localState.lastPhoto.push(perPage);
      } else {
        const nextFirst = localState.lastPhoto[page - 1] + 1;
        let nextLast = nextFirst + perPage;
        if (nextLast > totalPhotos) {
          nextLast = totalPhotos;
        }
        localState.firstPhoto.push(nextFirst);
        localState.lastPhoto.push(nextLast);
      }

      localState.pages.push(page + 1);
      if (localState.lastPhoto[page] === totalPhotos) {
        go = false;
      } else {
        page += 1;
      }
    }
    localState.photoArray = buildArray(
      1,
      localState.firstPhoto,
      localState.lastPhoto,
    );
    return localState;
  }

  function buildArray(pageNumber, firstPhoto, lastPhoto): string[] {
    const photoArray: string[] = [];
    for (
      let i = firstPhoto[pageNumber - 1];
      i <= lastPhoto[pageNumber - 1];
      i += 1
    ) {
      const source = filePrefix + i + fileSuffix;
      photoArray.push(source);
    }
    return photoArray;
  }

  function imageClick(event): void {
    const photoIndex = Number(event.currentTarget.dataset.i);
    showHideButtons(photoIndex);
    setState({ ...state, showModal: true });
  }

  function close(): void {
    setState({ ...state, showModal: false });
  }

  function prev(): void {
    const photoIndex = state.photoIndex - 1;
    showHideButtons(photoIndex);
  }

  function next(): void {
    const photoIndex = state.photoIndex + 1;
    showHideButtons(photoIndex);
  }

  function showHideButtons(photoIndex): void {
    const hideNext = photoIndex === state.photoArray.length - 1;
    const hidePrevious = photoIndex === 0;
    setState({ ...state, hideNext, hidePrevious, photoIndex });
  }

  function pageClick(event): void {
    const page = Number(event.currentTarget.dataset.id);
    setState({
      ...state,
      photoArray: buildArray(page, state.firstPhoto, state.lastPhoto),
    });
  }

  return (
    <div id="photoGallery">
      <ul className="row photo-gallery">
        {state.photoArray.map((photo, i) => {
          return (
            <li key={i} className="col-md-2 col-lg-2 col-sm-3 col-xs-4">
              <img
                onClick={imageClick}
                data-i={i}
                className="img-fluid"
                src={photo}
              />
            </li>
          );
        })}
      </ul>
      <Row>
        {state.pages.map((page, i) => {
          return (
            <div key={i}>
              <Button data-id={page} variant="primary" onClick={pageClick}>
                {"Page " + page}
              </Button>
            </div>
          );
        })}
      </Row>
      <Modal show={state.showModal} onHide={close}>
        <Modal.Body>
          <img src={state.photoArray[state.photoIndex]} className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <ul className="pager photo-gallery">
            <li className="previous">
              <Button
                variant="primary"
                hidden={state.hidePrevious}
                onClick={prev}
              >
                &larr; Previous
              </Button>
            </li>
            <li className="next">
              <Button variant="primary" hidden={state.hideNext} onClick={next}>
                Next &rarr;
              </Button>
            </li>
          </ul>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
