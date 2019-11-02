import * as React from "react";

export interface OwnState {
    initialized: boolean;
}

export class GooglePlusFollow extends React.Component<any, OwnState> {

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

        const googlePlusButton = this.node;
        const googlePlusScript = document.createElement("script");
        googlePlusScript.type = "text/javascript";
        googlePlusScript.src = "https://apis.google.com/js/platform.js";
        googlePlusButton.parentNode.appendChild(googlePlusScript);

        this.setState({ initialized: true });
    }

    nodeFunction(node) {
        this.node = node;
    }

    render() {
        return (
            <div ref={this.nodeFunction} className="g-follow"
                data-href="https://plus.google.com/u/0/114718071449100470041"
                data-rel="author" data-annotation="bubble" />
        );
    }
}
