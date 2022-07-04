/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import {Link} from "react-router-dom";

export class Applications extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h2 className="text-primary">Apps</h2>
                <div className="row">
                    <div className="col-sm-6">
                        <h2 className="text-success">Discount Calculator</h2>
                        <p>I originally wrote this as a Sencha Touch app. However, I lost the
                            code and I can't seem to recover it from the 'compiled' code that
                            Sencha helps you to put together. Anyway, I wrote it for Courtney in
                            2013 because she was working at an outlet store that offered this
                            style of discounts.</p>
                        <p>
                            <Link className="btn btn-info" to="/discountCalculator"
                                  role="button">View details &raquo;</Link>
                        </p>
                        <hr/>
                        <h2 className="text-success">Game</h2>
                        <p>Rock, Paper, Scissors, Lizard, Spock. Play against the computer!
                        </p>
                        <p>
                            <Link className="btn btn-info" to="/game" role="button">View
                                details &raquo;</Link>
                        </p>
                        <hr/>
                        <h2 className="text-success">ABC Checklist</h2>
                        <p>Fill out an Antecedent, Behavior, Consequence Checklist</p>
                        <p>
                            <Link className="btn btn-info" to="/abc" role="button">View
                                details &raquo;</Link>
                        </p>
                        <hr/>
                    </div>
                    <div className="col-sm-6">
                        <h2 className="text-success">Stock Quote</h2>
                        <p>Stock Quote Service</p>
                        <p>
                            <Link className="btn btn-info" to="/stockQuote" role="button">View
                                details &raquo;</Link>
                        </p>
                        <hr/>
                        <h2 className="text-success">Base 64 Encoder and Decoder</h2>
                        <p>Encode and Decode data into and out of Base64 format,
                            respectively.</p>
                        <p>
                            <Link className="btn btn-info" to="/base64" role="button">View
                                details &raquo;</Link>
                        </p>
                        <hr/>
                        <h2 className="text-success">Simple Grade book</h2>
                        <p>Figure out the final grade based on two quizes, one midterm and a
                            final exam</p>
                        <p>
                            <Link className="btn btn-info" to="/grades" role="button">View
                                details &raquo;</Link>
                        </p>
                        <hr/>
                        <h2 className="text-success">URL Builder</h2>
                        <p>Build a URL and launch it</p>
                        <p>
                            <Link className="btn btn-info" to="/urlBuilder" role="button">View
                                details &raquo;</Link>
                        </p>
                        <hr/>
                    </div>
                </div>
            </div>
        );
    }
}
