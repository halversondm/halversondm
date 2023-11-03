import React from "react";
import {render} from '@testing-library/react'
import ABC from "../../app/components/ABC";

test("Snapshot test", () => {
    const unit = <ABC/>;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});
