/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import React, {Component} from "react";

class Base64 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encodeInput: "",
            encodeOutput: "",
            decodeInput: "",
            decodeOutput: ""
        };
        this.setDecodeInput = this.setDecodeInput.bind(this);
        this.setEncodeInput = this.setEncodeInput.bind(this);
        this.goDecode = this.goDecode.bind(this);
        this.goEncode = this.goEncode.bind(this);
        this.clearDecode = this.clearDecode.bind(this);
        this.clearEncode = this.clearEncode.bind(this);
    }

    setEncodeInput(event) {
        this.setState({encodeInput: event.target.value});
    }

    goEncode() {
        const encodeOutput = window.btoa(this.state.encodeInput);
        this.setState({encodeOutput: encodeOutput});
    }

    clearEncode() {
        this.setState({encodeInput: "", encodeOutput: ""});
    }

    setDecodeInput(event) {
        this.setState({decodeInput: event.target.value});
    }

    goDecode() {
        const decodeOutput = window.atob(this.state.decodeInput);
        this.setState({decodeOutput: decodeOutput});
    }

    clearDecode() {
        this.setState({decodeInput: "", decodeOutput: ""});
    }

    render() {
        return <div>
            <h4 className="text-success">An all Bootstrap and React implementation of
                converting your data to and from Base64 encoding. No tracking of
                your data is done. No calls to other services. It's all in your
                browser.</h4>
            <tabset>
                <tab heading="Encode" id="encodeTab">
                    <form className="form-horizontal" role="form">
                        <h2>Encode Data to Base64</h2>
                        <div className="form-group">
                            <label forHtml="encodeInput" className="col-sm-2 control-label">Un-encoded</label>
                            <div className="col-sm-10">
                <textarea className="form-control" id="encodeInput"
                          value={this.state.encodeInput}
                          onChange={this.setEncodeInput} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label forHtml="encodeOutput" className="col-sm-2 control-label">Encoded</label>
                            <div className="col-sm-10">
                <textarea className="form-control" id="encodeOutput"
                          value={this.state.encodeOutput} readOnly/>
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button id="encode" className="btn btn-primary btn-sm"
                                        onClick={this.goEncode} type="button">Encode
                                </button>
                                <button className="btn btn-danger btn-sm"
                                        onClick={this.clearEncode} type="button">Clear
                                </button>
                            </div>
                        </div>
                    </form>
                </tab>
                <tab heading="Decode" id="decodeTab">
                    <form className="form-horizontal" role="form">
                        <h2>Decode Base 64 to Data</h2>
                        <div className="form-group">
                            <label forHtml="decodeInput" className="col-sm-2 control-label">Encoded</label>
                            <div className="col-sm-10">
                <textarea className="form-control" id="decodeInput"
                          value={this.state.decodeInput}
                          onChange={this.setDecodeInput} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label forHtml="decodeOutput" className="col-sm-2 control-label">Un-encoded</label>
                            <div className="col-sm-10">
                <textarea className="form-control" id="decodeOutput"
                          value={this.state.decodeOutput} readOnly/>
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button id="decode" className="btn btn-primary btn-sm"
                                        onClick={this.goDecode} type="button">Decode
                                </button>
                                <button className="btn btn-danger btn-sm"
                                        onClick={this.clearDecode} type="button">Clear
                                </button>
                            </div>
                        </div>
                    </form>
                </tab>
            </tabset>
        </div>;
    }
}

export default Base64;
