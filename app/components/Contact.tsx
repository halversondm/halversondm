/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import * as React from "react";

export default class Contact extends React.Component<undefined, undefined> {

    render() {
        return <div>
            <h2 className="text-primary">Contact Information</h2>
            <div className="row">
                <div className="col-sm-4">
                    <table className="table table-striped">
                        <tbody>
                        <tr>
                            <td>Email</td>
                            <td><a href="mailto:daniel.m.halverson@gmail.com">daniel.m.halverson@gmail.com</a>
                            </td>
                        </tr>
                        <tr>
                            <td>Twitter</td>
                            <td><a id="twitter-wjs" href="https://twitter.com/halversondm"
                                   className="twitter-follow-button" data-show-count="false"
                                   data-size="large">Follow @halversondm</a>
                            </td>
                        </tr>
                        <tr>
                            <td>Google+</td>
                            <td>
                                <div className="g-follow" data-annotation="bubble"
                                     data-height="24"
                                     data-href="https://plus.google.com/u/0/114718071449100470041"
                                     data-rel="author"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>Linkedin</td>
                            <td>
                                <script type="IN/MemberProfile"
                                        data-id="https://www.linkedin.com/in/dmhalverson"
                                        data-format="hover" data-related="false"
                                        data-text="Daniel Halverson"></script>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr />
            <h4 className="text-success">Send me an email</h4>
            <form action="mail.php" method="post">
                <input type="email" className="form-control" id="emailAddress"
                       name="emailAddress" placeholder="Your Email Address"/>
                <br/>
                <input type="text" className="form-control" id="subject"
                       name="subject" placeholder="Subject"/>
                <br/>
                <textarea id="message" name="message" className="form-control"
                          rows={3} placeholder="Message"/>
                <br/>
                <button type="submit" className="btn btn-success">Send</button>
            </form>
        </div>;
    }
}
