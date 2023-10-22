/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import { Modal } from 'react-bootstrap'
import { CheckboxSeries } from './CheckboxSeries'
import { type ReactNode } from 'react'

export interface ABCState {
  antecedentOtherDisabled: boolean
  messages: string[]
  showModal: boolean
  user: UserState
}

export interface UserState {
  when: string
  antecedent: string
  antecedentOther: string
  location: string
  people: string[]
  peopleOther: string
  behavior: string[]
  behaviorOther: string
  duration: string
  intensity: string
  consequence: string[]
  consequenceOther: string
}

export class ABC extends React.Component<unknown, ABCState> {
  public state: ABCState
  private people: CheckboxSeries
  private behaviors: CheckboxSeries
  private consequences: CheckboxSeries

  private readonly antecedentValues: string[] = ['Given Direction/task, asked to do something',
    'Asked to wait', 'Difficulty with task/activity',
    'Preferred activity interrupted', 'Activity/Item denied ("told no")',
    'Loud, noisy environment', 'Given assistance / correction',
    'Transition between locations', 'Attention given to others',
    'Attention not given when wanted', 'Left alone (no indiv. attention)']

  private readonly locationValues: string[] = ['Home', 'School', 'Other']
  private readonly peopleValues: string[] = ['Mom', 'Dad', 'Sibling', 'Grandparents', 'Alone', 'Peers']
  private readonly behaviorValues: string[] = ['Refuse to follow directions', 'Makes verbal threats',
    'Grabbing/pulling', 'Crying/Whining', 'Screaming/Yelling', 'Scratching',
    'Biting', 'Spitting', 'Kicking', 'Flopping', 'Running Away',
    'Destroying property', 'Hitting Self', 'Hitting Others',
    'Verbal Refusal']

  private readonly durationValues: string[] = ['< 1 min', '1 - 5 min', '5 - 10 min', '10 - 30 min',
    '30 min - 1 hr', '1 - 2 hrs', '2 - 3 hrs', '3+ hrs']

  private readonly intensityValues: string[] = ['Low', 'Medium', 'High']
  private readonly consequenceValues: string[] = ['Verbal Redirection', 'Physical assist/prompt',
    'Ignored problem behavior', 'Kept on demand',
    'Verbal reprimand', 'Removed from activity',
    'Given a different activity/task', 'Lost Privilege', 'Sent to room',
    'Given a time out', 'Left alone']

  private readonly refHandlers = {
    peopleRef: (ref) => (this.people = ref),
    behaviorsRef: (ref) => (this.behaviors = ref),
    consequencesRef: (ref) => (this.consequences = ref)
  }

  constructor () {
    super({})
    this.state = this.initialState()
    this.close = this.close.bind(this)
    this.getTime = this.getTime.bind(this)
    this.antecedentRadios = this.antecedentRadios.bind(this)
    this.antecedentOtherText = this.antecedentOtherText.bind(this)
    this.locationRadios = this.locationRadios.bind(this)
    this.durationRadios = this.durationRadios.bind(this)
    this.intensityRadios = this.intensityRadios.bind(this)
    this.save = this.save.bind(this)
    this.postToServer = this.postToServer.bind(this)
    this.validSave = this.validSave.bind(this)
    this.reset = this.reset.bind(this)
  }

  initialState (): ABCState {
    return {
      antecedentOtherDisabled: true,
      messages: [],
      showModal: false,
      user: {
        when: '',
        antecedent: '',
        antecedentOther: '',
        location: '',
        people: [],
        peopleOther: '',
        behavior: [],
        behaviorOther: '',
        duration: '',
        intensity: '',
        consequence: [],
        consequenceOther: ''
      }
    }
  }

  close (): void {
    this.setState({ showModal: false })
  }

  getTime (): void {
    const user = this.state.user
    const time = new Date()
    user.when = time.toLocaleString()
    this.setState({ user })
  }

  antecedentRadios (event): void {
    const antecedent = event.target.value
    const user = this.state.user
    user.antecedent = antecedent
    let antecedentOtherDisabled = this.state.antecedentOtherDisabled
    if (antecedent === 'Other') {
      antecedentOtherDisabled = false
    } else {
      antecedentOtherDisabled = true
      user.antecedentOther = ''
    }
    this.setState({
      user,
      antecedentOtherDisabled
    })
  }

  antecedentOtherText (event): void {
    const antecedentOtherText = event.target.value
    const user = this.state.user
    user.antecedentOther = antecedentOtherText
    this.setState({ user })
  }

  locationRadios (event): void {
    const location = event.target.value
    const user = this.state.user
    user.location = location
    this.setState({ user })
  }

  durationRadios (event): void {
    const duration = event.target.value
    const user = this.state.user
    user.duration = duration
    this.setState({ user })
  }

  intensityRadios (event): void {
    const intensity = event.target.value
    const user = this.state.user
    user.intensity = intensity
    this.setState({ user })
  }

  save (): void {
    const user = this.state.user
    const peoplePull = this.people.pullCurrentState()
    user.people = peoplePull.selected
    user.peopleOther = peoplePull.otherLabelText
    const behaviorPull = this.behaviors.pullCurrentState()
    user.behavior = behaviorPull.selected
    user.behaviorOther = behaviorPull.otherLabelText
    const consequencePull = this.consequences.pullCurrentState()
    user.consequence = consequencePull.selected
    user.consequenceOther = consequencePull.otherLabelText
    this.setState({ user, showModal: true })
    if (this.validSave()) {
      this.postToServer()
    }
  }

  postToServer (): void {
    const data: string = JSON.stringify(this.state.user)
    console.log('ABC data sent ', data)
    const xhr: XMLHttpRequest = new XMLHttpRequest()
    xhr.open('POST', '/saveABC')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => {
      const messages: string[] = []
      if (xhr.status >= 200 && xhr.status < 400) {
        console.log('succ ', xhr.responseText)
        messages.push(xhr.responseText)
      } else {
        console.log('unsucc ', xhr.responseText)
        messages.push(xhr.status + ' ' + xhr.statusText)
      }
      this.setState({ messages })
    }
    xhr.onerror = () => {
      console.log(xhr)
    }
    xhr.send(data)
  }

  validSave (): boolean {
    const messages: string[] = []
    if (this.state.user.people.length === 0) {
      messages.push('At least one Person is required to save.')
    } else if (this.state.user.people.indexOf('Other') === 0) {
      if (this.state.user.peopleOther === '') {
        messages.push(
          'For People - Other, the text description of Other must be entered.')
      }
    }
    if (this.state.user.behavior.length === 0) {
      messages.push('At least one Behavior is required to save.')
    } else if (this.state.user.behavior.indexOf('Other') === 0) {
      if (this.state.user.behaviorOther === '') {
        messages.push(
          'For Behavior - Other, the text description of Other must be entered.')
      }
    }
    if (this.state.user.consequence.length === 0) {
      messages.push('At least one Consequence is required to save.')
    } else if (this.state.user.consequence.indexOf('Other') === 0) {
      if (this.state.user.consequenceOther === '') {
        messages.push(
          'For Consequence - Other, the text description of Other must be entered.')
      }
    }
    if (this.state.user.antecedent.length === 0) {
      messages.push('An Antecedent is required to save.')
    } else if (this.state.user.antecedent === 'Other') {
      if (this.state.user.antecedentOther === '') {
        messages.push(
          'For Antecedent - Other, the text description of Other must be entered.')
      }
    }
    if (this.state.user.location.length === 0) {
      messages.push('A Location is required to save.')
    }
    if (this.state.user.duration.length === 0) {
      messages.push('A Duration is required to save.')
    }
    if (this.state.user.intensity.length === 0) {
      messages.push('An Intensity is required to save.')
    }
    if (this.state.user.when.length === 0) {
      messages.push('The date and time of the ABC is required to save.')
    }
    this.setState({ messages })
    return messages.length === 0
  }

  reset (): void {
    this.setState(this.initialState())
    this.people.reset()
    this.behaviors.reset()
    this.consequences.reset()
  }

  render (): ReactNode {
    return (
            <div>
                <h2 className="text-primary">ABC Checklist</h2>
                <div id="abcChecklist">
                    <div className="row">
                        <div className="col-md-1">
                            <h4>When?</h4>
                            <hr/>
                            <input className="btn btn-primary" onClick={this.getTime}
                                   type="button" value="Now" id="now"/>
                            <div id="dateTime">{this.state.user.when}</div>
                        </div>
                        <div className="col-md-4">
                            <h4>Antecedent</h4>
                            <hr/>
                            <b>What happened before the behavior?</b>
                            <br/>
                            {
                                this.antecedentValues.map((antecedent, i) => {
                                  return <div className="radio" key={i}>
                                        <label>
                                            <input type="radio" value={antecedent}
                                                   onClick={this.antecedentRadios}
                                                   checked={this.state.user.antecedent === antecedent}/>{antecedent}
                                        </label>
                                    </div>
                                })
                            }
                            <div className="radio">
                                <label>
                                    <input type="radio"
                                           checked={this.state.user.antecedent === 'Other'}
                                           value="Other"
                                           onClick={this.antecedentRadios}/> Other
                                </label>
                            </div>
                            <input type="text" className="form-control" id="antecedentOther"
                                   value={this.state.user.antecedentOther}
                                   placeholder="Enter Description"
                                   onChange={this.antecedentOtherText}
                                   disabled={this.state.antecedentOtherDisabled}/>
                            <br/> <b>Location</b>
                            <br/>
                            {
                                this.locationValues.map((location, i) => {
                                  return <div className="radio-inline"
                                                key={i}>
                                        <label>
                                            <input type="radio" onClick={this.locationRadios}
                                                   checked={this.state.user.location === location}
                                                   value={location}/>{location}
                                        </label>
                                    </div>
                                })
                            }
                            <br/> <b>People Present</b>
                            <br/>
                            <CheckboxSeries labels={this.peopleValues} selected={this.state.user.people}
                                            ref={this.refHandlers.peopleRef}
                                            otherLabelPlaceholder="Enter Another Person Present"
                                            otherLabelText={this.state.user.peopleOther}/>
                        </div>
                        <div className="col-md-3">
                            <h4>Behavior</h4>
                            <hr/>
                            <b>Select all that apply</b>
                            <CheckboxSeries labels={this.behaviorValues}
                                            ref={this.refHandlers.behaviorsRef}
                                            selected={this.state.user.behavior}
                                            otherLabelPlaceholder="Enter Description"
                                            otherLabelText={this.state.user.behaviorOther}/>
                            <br/> <b>Duration</b>
                            <br/>
                            {
                                this.durationValues.map((duration, i) => {
                                  return <div className="radio-inline" key={i}>
                                        <label>
                                            <input type="radio" onClick={this.durationRadios}
                                                   checked={this.state.user.duration === duration}
                                                   value={duration}/>{duration}
                                        </label>
                                    </div>
                                })
                            }
                            <br/> <b>Intensity</b>
                            <br/>
                            {
                                this.intensityValues.map((intensity, i) => {
                                  return <div className="radio-inline" key={i}>
                                        <label>
                                            <input type="radio" onClick={this.intensityRadios}
                                                   checked={this.state.user.intensity === intensity}
                                                   value={intensity}/>{intensity}
                                        </label>
                                    </div>
                                })
                            }
                        </div>
                        <div className="col-md-4">
                            <h4>Consequence</h4>
                            <hr/>
                            <b>What happened after?</b>
                            <br/>
                            <CheckboxSeries labels={this.consequenceValues}
                                            selected={this.state.user.consequence}
                                            ref={this.refHandlers.consequencesRef}
                                            otherLabelPlaceholder="Enter Description"
                                            otherLabelText={this.state.user.consequenceOther}/>
                        </div>
                    </div>
                    <br/>
                    <div className="form-inline">
                        <div className="form-group">
                            <input className="btn btn-success form-control" type="submit"
                                   onClick={this.save} value="Save" id="save"/>
                        </div>
                        <div className="form-group">
                            <input className="btn btn-danger form-control" type="reset"
                                   onClick={this.reset}
                                   value="Reset" id="reset"/>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <p>ABC Save Results</p>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {
                                this.state.messages.map((message, i) => {
                                  return <li key={i}>{message}</li>
                                })
                            }
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <p style={{ right: 'auto' }}>Click anywhere to continue</p>
                    </Modal.Footer>
                </Modal>
                <div id="abcModal" className="modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p>ABC Save Results</p>
                            </div>
                            <div className="modal-body">
                                <ul>
                                    {
                                        this.state.messages.map((message, i) => {
                                          return <li key={i}>{message}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <p style={{ right: 'auto' }}>Click anywhere to continue</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
  }
}
