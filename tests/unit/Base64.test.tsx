import React from "react";
import { render } from '@testing-library/react';
import Base64 from "../../app/components/Base64";

test("Base64 component", () => {
    const unit = <Base64 />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});