/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import React from "react";
import CheckboxSeries from "./CheckboxSeries";
import $ from "jquery";

const antecedents = ["Given Direction/task, asked to do something",
  "Asked to wait", "Difficulty with task/activity",
  "Preferred activity interrupted", "Activity/Item denied (\"told no\")",
  "Loud, noisy environment", "Given assistance / correction",
  "Transition between locations", "Attention given to others",
  "Attention not given when wanted", "Left alone (no indiv. attention)"];
const locations = ["Home", "School", "Other"];
const people = ["Mom", "Dad", "Sibling", "Grandparents", "Alone", "Peers"];
const behaviors = ["Refuse to follow directions", "Makes verbal threats",
  "Grabbing/pulling", "Crying/Whining", "Screaming/Yelling", "Scratching",
  "Biting", "Spitting", "Kicking", "Flopping", "Running Away",
  "Destroying property", "Hitting Self", "Hitting Others",
  "Verbal Refusal"];
const durations = ["< 1 min", "1 - 5 min", "5 - 10 min", "10 - 30 min",
  "30 min - 1 hr", "1 - 2 hrs", "2 - 3 hrs", "3+ hrs"];
const intensities = ["Low", "Medium", "High"];
const consequences = ["Verbal Redirection", "Physical assist/prompt",
  "Ignored problem behavior", "Kept on demand",
  "Verbal reprimand", "Removed from activity",
  "Given a different activity/task", "Lost Privilege", "Sent to room",
  "Given a time out", "Left alone"];

const ABC = React.createClass({

  getInitialState() {
    return {
      antecedentOtherDisabled: true,
      messages: [],
      user: {
        when: "",
        antecedent: "",
        antecedentOther: "",
        location: "",
        people: [],
        peopleOther: "",
        behavior: [],
        behaviorOther: "",
        duration: "",
        intensity: "",
        consequence: [],
        consequenceOther: ""
      }
    };
  },
  getTime() {
    var user = this.state.user;
    var time = new Date();
    user.when = time.toLocaleString();
    this.setState({user: user});
  },
  antecedentRadios(event) {
    var antecedent = event.target.value;
    var user = this.state.user;
    user.antecedent = antecedent;
    var antecedentOtherDisabled = this.state.antecedentOtherDisabled;
    if (antecedent === "Other") {
      antecedentOtherDisabled = false;
    } else {
      antecedentOtherDisabled = true;
      user.antecedentOther = "";
    }
    this.setState({
      user: user,
      antecedentOtherDisabled: antecedentOtherDisabled
    });
  },
  antecedentOtherText(event) {
    var antecedentOtherText = event.target.value;
    var user = this.state.user;
    user.antecedentOther = antecedentOtherText;
    this.setState({user: user});
  },
  locationRadios(event) {
    var location = event.target.value;
    var user = this.state.user;
    user.location = location;
    this.setState({user: user});
  },
  durationRadios(event) {
    var duration = event.target.value;
    var user = this.state.user;
    user.duration = duration;
    this.setState({user: user});
  },
  intensityRadios(event) {
    var intensity = event.target.value;
    var user = this.state.user;
    user.intensity = intensity;
    this.setState({user: user});
  },
  save() {
    var user = this.state.user;
    var peoplePull = this.refs.people.pullCurrentState();
    user.people = peoplePull.selected;
    user.peopleOther = peoplePull.otherLabelText;
    var behaviorPull = this.refs.behaviors.pullCurrentState();
    user.behavior = behaviorPull.selected;
    user.behaviorOther = behaviorPull.otherLabelText;
    var consequencePull = this.refs.consequences.pullCurrentState();
    user.consequence = consequencePull.selected;
    user.consequenceOther = consequencePull.otherLabelText;
    // TODO do I need to update state here?
    this.setState({user: user});
    if (this.validSave()) {
      this.postToServer();
    }
  },
  postToServer() {
    var messages = [];
    $.ajax({
      url: "/saveABC",
      data: JSON.stringify(this.state.user),
      dataType: "json",
      method: "POST"
    }).then(() => {
      messages.push("successful save");
      this.setState({messages: messages});
    }, () => {
      messages.push("unsuccessful save");
      this.setState({messages: messages});
    });
  },
  validSave() {
    var messages = [];
    if (this.state.user.people.length === 0) {
      messages.push("At least one Person is required to save.");
    } else if (this.state.user.people.indexOf("Other") === 0) {
      if (this.state.user.peopleOther === "") {
        messages.push(
          "For People - Other, the text description of Other must be entered.");
      }
    }
    if (this.state.user.behavior.length === 0) {
      messages.push("At least one Behavior is required to save.");
    } else if (this.state.user.behavior.indexOf("Other") === 0) {
      if (this.state.user.behaviorOther === "") {
        messages.push(
          "For Behavior - Other, the text description of Other must be entered.");
      }
    }
    if (this.state.user.consequence.length === 0) {
      messages.push("At least one Consequence is required to save.");
    } else if (this.state.user.consequence.indexOf("Other") === 0) {
      if (this.state.user.consequenceOther === "") {
        messages.push(
          "For Consequence - Other, the text description of Other must be entered.");
      }
    }
    if (this.state.user.antecedent.length === 0) {
      messages.push("An Antecedent is required to save.");
    } else if (this.state.user.antecedent === "Other") {
      if (this.state.user.antecedentOther === "") {
        messages.push(
          "For Antecedent - Other, the text description of Other must be entered.");
      }
    }
    if (this.state.user.location.length === 0) {
      messages.push("A Location is required to save.");
    }
    if (this.state.user.duration.length === 0) {
      messages.push("A Duration is required to save.");
    }
    if (this.state.user.intensity.length === 0) {
      messages.push("An Intensity is required to save.");
    }
    if (this.state.user.when.length === 0) {
      messages.push("The date and time of the ABC is required to save.");
    }
    this.setState({messages: messages});
    return messages.length === 0;
  },
  reset() {
    this.setState(this.getInitialState());
    this.refs.people.reset();
    this.refs.behaviors.reset();
    this.refs.consequences.reset();
  },
  render() {
    return <div>
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
              antecedents.map((antecedent, i) => {
                return <div className="radio" key={i}>
                  <label>
                    <input type="radio" value={antecedent}
                           onClick={this.antecedentRadios}
                           checked={this.state.user.antecedent === antecedent}/>{antecedent}
                  </label>
                </div>;
              })
            }
            <div className="radio">
              <label>
                <input type="radio"
                       checked={this.state.user.antecedent === "Other"}
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
              locations.map((location, i) => {
                return <div className="radio-inline"
                            key={i}>
                  <label>
                    <input type="radio" onClick={this.locationRadios}
                           checked={this.state.user.location === location}
                           value={location}/>{location}
                  </label>
                </div>;
              })
            }
            <br/> <b>People Present</b>
            <br/>
            <CheckboxSeries labels={people} selected={this.state.user.people}
                            ref="people"
                            otherLabelPlaceholder="Enter Another Person Present"
                            otherLabelText={this.state.user.peopleOther}/>
          </div>
          <div className="col-md-3">
            <h4>Behavior</h4>
            <hr/>
            <b>Select all that apply</b>
            <CheckboxSeries labels={behaviors}
                            selected={this.state.user.behavior} ref="behaviors"
                            otherLabelPlaceholder="Enter Description"
                            otherLabelText={this.state.user.behaviorOther}/>
            <br/> <b>Duration</b>
            <br/>
            {
              durations.map((duration, i) => {
                return <div className="radio-inline" key={i}>
                  <label>
                    <input type="radio" onClick={this.durationRadios}
                           checked={this.state.user.duration === duration}
                           value={duration}/>{duration}
                  </label>
                </div>;
              })
            }
            <br/> <b>Intensity</b>
            <br/>
            {
              intensities.map((intensity, i) => {
                return <div className="radio-inline" key={i}>
                  <label>
                    <input type="radio" onClick={this.intensityRadios}
                           checked={this.state.user.intensity === intensity}
                           value={intensity}/>{intensity}
                  </label>
                </div>;
              })
            }
          </div>
          <div className="col-md-4">
            <h4>Consequence</h4>
            <hr/>
            <b>What happened after?</b>
            <br/>
            <CheckboxSeries labels={consequences}
                            selected={this.state.user.consequence}
                            ref="consequences"
                            otherLabelPlaceholder="Enter Description"
                            otherLabelText={this.state.user.consequenceOther}/>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-12">
            <input className="btn btn-success" type="submit"
                   data-toggle="modal" data-target="#abcModal"
                   onClick={this.save} value="Save" id="save"/>
            <input className="btn btn-danger" type="reset" onClick={this.reset}
                   value="Reset" id="reset"/>
          </div>
        </div>
      </div>
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
                    return <li key={i}>{message}</li>;
                  })
                }
              </ul>
            </div>
            <div className="modal-footer">
              <p style={{right: "auto"}}>Click anywhere to continue</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
});

export default ABC;
