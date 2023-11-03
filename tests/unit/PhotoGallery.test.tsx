import React from "react";
import { render } from '@testing-library/react';
import PhotoGallery from "../../app/components/PhotoGallery";

test("Photo Gallery to match", () => {
  const unit = (
    <PhotoGallery
      perPage={5}
      filePrefix="photo"
      fileSuffix=".jpg"
      totalPhotos={10}
    />
  );
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});
