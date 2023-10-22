/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import {Link} from 'react-router-dom'
import {type ReactNode} from 'react'

export class Home extends React.Component<unknown, unknown> {
    render(): ReactNode {
        return (
            <div>
                <div className="jumbotron">
                    <h1>@halversondm</h1>
                    <p>Website of Dan Halverson</p>
                    <p>
                        <Link className="btn btn-primary btn-lg" to="/about" role="button">Learn
                            more &raquo;</Link>
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <h2 className="text-primary">Auto</h2>
                        <p>My favorite cars and motorcycles.</p>
                        <p>
                            <Link className="btn btn-info" to="/auto" role="button">View
                                details &raquo;</Link>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h2 className="text-primary">Apps</h2>
                        <p>Web Applications that I have written.</p>
                        <p>
                            <Link className="btn btn-info" to="/apps" role="button">View
                                details &raquo;</Link>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h2 className="text-primary">Resume</h2>
                        <p>Who I&apos;ve worked for and my education details</p>
                        <p>
                            <Link className="btn btn-info" to="/resume" role="button">View
                                details &raquo;</Link>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h2 className="text-primary">Blog</h2>
                        <p>My Tech Blog where I opine on ... tech</p>
                        <p>
                            <Link className="btn btn-info" to="/blog" role="button">View
                                details &raquo;</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
