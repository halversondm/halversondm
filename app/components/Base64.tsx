/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import { type ReactNode, useState } from "react";

interface Base64State {
  encodeInput: string;
  encodeOutput: string;
  decodeInput: string;
  decodeOutput: string;
}

export default function Base64(): ReactNode {
  const [base64State, setBase64State] = useState<Base64State>({
    encodeInput: "",
    encodeOutput: "",
    decodeInput: "",
    decodeOutput: "",
  });

  function setEncodeInput(event): void {
    setBase64State({ ...base64State, encodeInput: event.target.value });
  }

  function goEncode(): void {
    const encodeOutput = window.btoa(base64State.encodeInput);
    setBase64State({ ...base64State, encodeOutput });
  }

  function clearEncode(): void {
    setBase64State({ ...base64State, encodeInput: "", encodeOutput: "" });
  }

  function setDecodeInput(event): void {
    setBase64State({ ...base64State, decodeInput: event.target.value });
  }

  function goDecode(): void {
    const decodeOutput = window.atob(base64State.decodeInput);
    setBase64State({ ...base64State, decodeOutput });
  }

  function clearDecode(): void {
    setBase64State({ ...base64State, decodeInput: "", decodeOutput: "" });
  }

  return (
    <div>
      <h4 className="text-success">
        An all Bootstrap and React implementation of converting your data to and
        from Base64 encoding. No tracking of your data is done. No calls to
        other services. It&quot;s all in your browser.
      </h4>
      <div>
        <div title="Encode" id="encodeTab">
          <form className="form-horizontal" role="form">
            <h2>Encode Data to Base64</h2>
            <div className="form-group">
              <label htmlFor="encodeInput" className="col-sm-2 control-label">
                Un-encoded
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="encodeInput"
                  value={base64State.encodeInput}
                  onChange={setEncodeInput}
                  required={true}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="encodeOutput" className="col-sm-2 control-label">
                Encoded
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="encodeOutput"
                  value={base64State.encodeOutput}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  id="encode"
                  className="btn btn-primary btn-sm"
                  onClick={goEncode}
                  type="button"
                >
                  Encode
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={clearEncode}
                  type="button"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
        <div title="Decode" id="decodeTab">
          <form className="form-horizontal" role="form">
            <h2>Decode Base 64 to Data</h2>
            <div className="form-group">
              <label htmlFor="decodeInput" className="col-sm-2 control-label">
                Encoded
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="decodeInput"
                  value={base64State.decodeInput}
                  onChange={setDecodeInput}
                  required={true}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="decodeOutput" className="col-sm-2 control-label">
                Un-encoded
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="decodeOutput"
                  value={base64State.decodeOutput}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  id="decode"
                  className="btn btn-primary btn-sm"
                  onClick={goDecode}
                  type="button"
                >
                  Decode
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={clearDecode}
                  type="button"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
