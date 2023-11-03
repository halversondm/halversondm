import React from "react";
import {render} from '@testing-library/react'
import About from "../../app/components/About";

test("About component", () => {
    const unit = <About />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});