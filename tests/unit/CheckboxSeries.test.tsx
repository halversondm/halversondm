import React from "react";
import { render } from '@testing-library/react';
import CheckboxSeries from "../../app/components/CheckboxSeries";

test("Checkbox Series to match", () => {
  function fakeCallback(event: undefined, scope: string) {}
  const unit = (
    <CheckboxSeries
      labels={["one", "two"]}
      selected={["one"]}
      otherLabelPlaceholder="test"
      otherLabelText="anotherTest"
      otherLabelDisabled={false}
      setOtherLabelChange={(event) => fakeCallback(event, "test")}
      toggleSelected={(event) => fakeCallback(event, "test")}
    />
  );
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});
