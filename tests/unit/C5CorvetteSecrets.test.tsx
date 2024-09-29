import React from "react";
import { render } from '@testing-library/react';
import C5CorvetteSecrets from "../../app/components/C5CorvetteSecrets";

test("C5CorvetteSecretes component", () => {
    const unit = <C5CorvetteSecrets />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});