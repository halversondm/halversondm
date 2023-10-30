import * as React from "react";
import * as renderer from "react-test-renderer";
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
  const component = renderer.create(unit);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
