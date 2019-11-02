import * as React from "react";

export interface OwnState {
    initialized: boolean;
}

declare var twttr;

export class TwitterFollowButton extends React.Component<any, OwnState> {

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

        if (typeof twttr === "undefined") {
            const twitterbutton = this.node;
            const twitterscript = document.createElement("script");
            twitterscript.src = "//platform.twitter.com/widgets.js";
            twitterscript.async = true;
            twitterscript.id = "twitter-wjs";
            twitterbutton.parentNode.appendChild(twitterscript);
        } else {
            twttr.widgets.load();
        }

        this.setState({ initialized: true });
    }

    nodeFunction(node) {
        this.node = node;
    }

    render() {
        return (
            <a ref={this.nodeFunction}
                href="https://twitter.com/halversondm"
                className="twitter-follow-button"
                data-show-count={true}>
                Follow @halversondm
            </a>
        );
    }
}
