/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import { type ReactNode, useState } from "react";
import { LinkedInButton } from "./LinkedInButton";
import { TwitterFollowButton } from "./TwitterFollowButton";

interface OwnState {
  subject: string;
  message: string;
}

export default function Contact(): ReactNode {
  const [state, setState] = useState<OwnState>(initialState());

  function initialState(): OwnState {
    return { subject: "", message: "" };
  }

  function captureSubject(event): void {
    const subject: string = event.target.value;
    setState({ ...state, subject });
  }

  function captureMessage(event): void {
    const message: string = event.target.value;
    setState({ ...state, message });
  }

  const href =
    "mailto:daniel.m.halverson@gmail.com" +
    "?subject=" +
    state.subject +
    "&body=" +
    state.message;
  return (
    <div>
      <h2 className="text-primary">Contact Information</h2>
      <div className="row">
        <div className="col-sm-4">
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>Email</td>
                <td>
                  <a href="mailto:daniel.m.halverson@gmail.com">
                    daniel.m.halverson@gmail.com
                  </a>
                </td>
              </tr>
              <tr>
                <td>Twitter</td>
                <td>
                  <TwitterFollowButton />
                </td>
              </tr>
              <tr>
                <td>Linkedin</td>
                <td>
                  <LinkedInButton />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <h4 className="text-success">Send me an email</h4>
      <form className="form">
        <input
          type="text"
          className="form-control"
          id="subject"
          onBlur={captureSubject}
          placeholder="Subject"
        />
        <br />
        <textarea
          id="message"
          onBlur={captureMessage}
          className="form-control"
          rows={3}
          placeholder="Message"
        />
        <br />
        <a className="btn btn-success" href={href}>
          Send
        </a>
      </form>
    </div>
  );
}
