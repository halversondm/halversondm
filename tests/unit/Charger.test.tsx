import React from "react";
import { render } from '@testing-library/react';
import Charger from "../../app/components/Charger";

test("Charger component", () => {
    const unit = <Charger />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});