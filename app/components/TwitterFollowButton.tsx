import * as React from "react";
import {type ReactNode, useEffect} from "react";

export default function TwitterFollowButton(): ReactNode {

    useEffect(() => {
        const twitterscript = document.createElement("script");
        twitterscript.src = window.location.protocol + "//platform.twitter.com/widgets.js";
        twitterscript.async = true;
        twitterscript.defer = true;
        twitterscript.id = "twitter-wjs";
        document.body.appendChild(twitterscript);
        return () => {
            document.body.removeChild(twitterscript);
        }
    })

    return (
        <a href="https://twitter.com/halversondm" className="twitter-follow-button" data-show-count={true}>
            Follow @halversondm
        </a>
    );
}
