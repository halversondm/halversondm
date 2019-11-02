import * as React from "react";
import * as renderer from "react-test-renderer";
import { CheckboxSeries } from "../../app/components/CheckboxSeries";

test("Checkbox Series to match", () => {
    const unit = (
        <CheckboxSeries labels={["one", "two"]} selected={["one"]}
            otherLabelPlaceholder="test" otherLabelText="anotherTest" />
    );
    const component = renderer.create(unit);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
