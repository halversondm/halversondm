import React from "react";
import { render } from '@testing-library/react';
import Corvette from "../../app/components/Corvette";

test("Corvette component", () => {
    const unit = <Corvette />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});