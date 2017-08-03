import * as React from "react";
import * as renderer from "react-test-renderer";
import { ABC } from "../../app/components/ABC";

test("Checkbox Series to match", () => {
    const unit = (
        <ABC />
    );
    const component = renderer.create(unit);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
