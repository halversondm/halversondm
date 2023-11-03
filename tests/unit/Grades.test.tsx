import React from "react";
import { render } from '@testing-library/react';
import Grades from "../../app/components/Grades";

test("Grades component", () => {
    const unit = <Grades />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});