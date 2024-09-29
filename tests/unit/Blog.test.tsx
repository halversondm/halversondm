import React from "react";
import Blog from "../../app/components/Blog";
import {render} from '@testing-library/react'

test("Blog component", () => {
    const unit = <Blog />;
    const component = render(unit);
    const tree = component.container
    expect(tree.toString()).toMatchSnapshot();
});