import React from "react";
import { render } from '@testing-library/react';
import Game from "../../app/components/Game";

test("Game component", () => {
    const unit = <Game />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});