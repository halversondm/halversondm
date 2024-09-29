import React from "react";
import { render } from '@testing-library/react';
import Honda from "../../app/components/Honda";

test("Honda component", () => {
    const unit = <Honda />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});