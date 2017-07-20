import * as React from "react";
import * as renderer from "react-test-renderer";
import {CheckboxSeries} from "../../app/components/CheckboxSeries";

test("Checkbox Series to match", () => {
    const component = renderer.create(<CheckboxSeries labels={["one", "two"]} selected={["one"]}
                                                      otherLabelPlaceholder="test" otherLabelText="anotherTest"/>);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});