import * as React from "react";

export interface OwnState {
    initialized: boolean;
}

declare var IN;

export class LinkedInButton extends React.Component<any, OwnState> {

    state: OwnState;
    node: any;

    constructor(props) {
        super(props);
        this.state = { initialized: false };
        this.nodeFunction = this.nodeFunction.bind(this);
    }

    componentDidMount() {
        if (this.state.initialized) {
            return;
        }

        if (typeof IN === "undefined") {
            const linkedInButton = this.node;
            const linkedInScript = document.createElement("script");
            linkedInScript.type = "text/javascript";
            linkedInScript.src = "https://platform.linkedin.com/in.js";
            linkedInButton.parentNode.appendChild(linkedInScript);
        } else {
            IN.init();
        }

        this.setState({ initialized: true });
    }

    componentWillUnmount() {
        Reflect.deleteProperty(window, "IN");
    }

    nodeFunction(node) {
        this.node = node;
    }

    render() {
        return (
            <script ref={this.nodeFunction} type="IN/MemberProfile"
                data-id="https://www.linkedin.com/in/dmhalverson"
                data-format="hover" data-related="false"
                data-text="Daniel Halverson" />
        );
    }
}
