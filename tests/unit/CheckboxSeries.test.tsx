import * as React from "react";
import * as renderer from "react-test-renderer";
import CheckboxSeries from "../../app/components/CheckboxSeries";

test("Checkbox Series to match", () => {
    function fakeCallback(event :undefined, scope: string) {

    }
    const unit = (
        <CheckboxSeries labels={["one", "two"]} selected={["one"]}
            otherLabelPlaceholder="test" otherLabelText="anotherTest"
                        otherLabelDisabled={false}
                        setOtherLabelChange={(event) => (fakeCallback(event,'test'))}
                        toggleSelected={(event) => (fakeCallback(event,'test'))} />
    );
    const component = renderer.create(unit);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
