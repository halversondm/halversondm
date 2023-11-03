import * as React from "react";
import {type ReactNode, useEffect} from "react";

export default function LinkedInButton(): ReactNode {

    useEffect(() => {
        // <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>

        const linkedInScript = document.createElement("script");
        linkedInScript.src = window.location.protocol + "//platform.linkedin.com/badges/js/profile.js";
        linkedInScript.type = "text/javascript";
        linkedInScript.async = true;
        linkedInScript.defer = true;
        linkedInScript.id = 'linkedin';
        document.body.appendChild(linkedInScript);
        return () => {
            document.body.removeChild((linkedInScript));
        }
    }, [])

    return (
        <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light"
             data-type="VERTICAL" data-vanity="dmhalverson" data-version="v1">
            <a className="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/dmhalverson?trk=profile-badge">Daniel Halverson</a>
        </div>
    );
}
