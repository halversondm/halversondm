/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import {type ReactNode} from 'react'
import {LinkedInButton} from './LinkedInButton'
import {TwitterFollowButton} from './TwitterFollowButton'

export interface OwnState {
    subject: string
    message: string
}

export class Contact extends React.Component<unknown, OwnState> {
    state: OwnState

    constructor(props) {
        super(props)
        this.state = {
            subject: '',
            message: ''
        }
        this.captureSubject = this.captureSubject.bind(this)
        this.captureMessage = this.captureMessage.bind(this)
        this.clear = this.clear.bind(this)
    }

    clear(event): void {
        this.setState({subject: '', message: ''})
    }

    captureSubject(event): void {
        const subject: string = event.target.value
        this.setState({subject})
    }

    captureMessage(event): void {
        const message: string = event.target.value
        this.setState({message})
    }

    render(): ReactNode {
        const href = 'mailto:daniel.m.halverson@gmail.com' +
            '?subject=' + this.state.subject + '&body=' + this.state.message
        return (
            <div>
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
                                <td><TwitterFollowButton/>
                                </td>
                            </tr>
                            <tr>
                                <td>Linkedin</td>
                                <td>
                                    <LinkedInButton/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr/>
                <h4 className="text-success">Send me an email</h4>
                <form className="form">
                    <input type="text" className="form-control" id="subject"
                           onBlur={this.captureSubject} placeholder="Subject"/>
                    <br/>
                    <textarea id="message" onBlur={this.captureMessage} className="form-control"
                              rows={3} placeholder="Message"/>
                    <br/>
                    <a className="btn btn-success" href={href}>Send</a>
                </form>
            </div>
        )
    }
}
