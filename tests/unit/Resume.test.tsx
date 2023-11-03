import React from "react";
import { render } from '@testing-library/react';
import Resume from "../../app/components/Resume";

test("Resume component", () => {
    const unit = <Resume />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});