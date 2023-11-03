/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import { Modal } from "react-bootstrap";
import CheckboxSeries from "./CheckboxSeries";
import { type ReactNode, useState } from "react";

interface ABCState {
  antecedentOtherDisabled: boolean;
  messages: string[];
  showModal: boolean;
  user: UserState;
}

interface UserState {
  when: string;
  antecedent: string;
  antecedentOther: string;
  location: string;
  people: string[];
  peopleOther: string;
  peopleOtherLabelDisabled: boolean;
  behavior: string[];
  behaviorOther: string;
  behaviorOtherLabelDisabled: boolean;
  duration: string;
  intensity: string;
  consequence: string[];
  consequenceOther: string;
  consequenceOtherLabelDisabled: boolean;
}

export default function ABC(): ReactNode {
  const [state, setState] = useState<ABCState>(initialState());

  const antecedentValues: string[] = [
    "Given Direction/task, asked to do something",
    "Asked to wait",
    "Difficulty with task/activity",
    "Preferred activity interrupted",
    'Activity/Item denied ("told no")',
    "Loud, noisy environment",
    "Given assistance / correction",
    "Transition between locations",
    "Attention given to others",
    "Attention not given when wanted",
    "Left alone (no indiv. attention)",
  ];

  const locationValues: string[] = ["Home", "School", "Other"];
  const peopleValues: string[] = [
    "Mom",
    "Dad",
    "Sibling",
    "Grandparents",
    "Alone",
    "Peers",
  ];
  const behaviorValues: string[] = [
    "Refuse to follow directions",
    "Makes verbal threats",
    "Grabbing/pulling",
    "Crying/Whining",
    "Screaming/Yelling",
    "Scratching",
    "Biting",
    "Spitting",
    "Kicking",
    "Flopping",
    "Running Away",
    "Destroying property",
    "Hitting Self",
    "Hitting Others",
    "Verbal Refusal",
  ];

  const durationValues: string[] = [
    "< 1 min",
    "1 - 5 min",
    "5 - 10 min",
    "10 - 30 min",
    "30 min - 1 hr",
    "1 - 2 hrs",
    "2 - 3 hrs",
    "3+ hrs",
  ];

  const intensityValues: string[] = ["Low", "Medium", "High"];
  const consequenceValues: string[] = [
    "Verbal Redirection",
    "Physical assist/prompt",
    "Ignored problem behavior",
    "Kept on demand",
    "Verbal reprimand",
    "Removed from activity",
    "Given a different activity/task",
    "Lost Privilege",
    "Sent to room",
    "Given a time out",
    "Left alone",
  ];

  function initialState(): ABCState {
    return {
      antecedentOtherDisabled: true,
      messages: [],
      showModal: false,
      user: {
        when: "",
        antecedent: "",
        antecedentOther: "",
        location: "",
        people: [],
        peopleOther: "",
        peopleOtherLabelDisabled: true,
        behavior: [],
        behaviorOther: "",
        behaviorOtherLabelDisabled: true,
        duration: "",
        intensity: "",
        consequence: [],
        consequenceOther: "",
        consequenceOtherLabelDisabled: true,
      },
    };
  }

  function close(): void {
    setState({ ...state, showModal: false });
  }

  function getTime(): void {
    const user = state.user;
    const time = new Date();
    user.when = time.toLocaleString();
    setState({ ...state, user });
  }

  function antecedentRadios(event): void {
    const antecedent = event.target.value;
    const user = state.user;
    user.antecedent = antecedent;
    let antecedentOtherDisabled;
    if (antecedent === "Other") {
      antecedentOtherDisabled = false;
    } else {
      antecedentOtherDisabled = true;
      user.antecedentOther = "";
    }
    setState({ ...state, user, antecedentOtherDisabled });
  }

  function antecedentOtherText(event): void {
    const antecedentOtherText = event.target.value;
    const user = state.user;
    user.antecedentOther = antecedentOtherText;
    setState({ ...state, user });
  }

  function locationRadios(event): void {
    const location = event.target.value;
    const user = state.user;
    user.location = location;
    setState({ ...state, user });
  }

  function durationRadios(event): void {
    const duration = event.target.value;
    const user = state.user;
    user.duration = duration;
    setState({ ...state, user });
  }

  function intensityRadios(event): void {
    const intensity = event.target.value;
    const user = state.user;
    user.intensity = intensity;
    setState({ ...state, user });
  }

  function save(): void {
    setState({ ...state, showModal: true });
    if (validSave()) {
      postToServer();
    }
  }

  function postToServer(): void {
    const data: string = JSON.stringify(state.user);
    console.log("ABC data sent ", data);
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("POST", "/saveABC");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      const messages: string[] = [];
      if (xhr.status >= 200 && xhr.status < 400) {
        console.log("succ ", xhr.responseText);
        messages.push(xhr.responseText);
      } else {
        console.log("unsucc ", xhr.responseText);
        messages.push(xhr.status + " " + xhr.statusText);
      }
      setState({ ...state, messages });
    };
    xhr.onerror = () => {
      console.log(xhr);
    };
    xhr.send(data);
  }

  function validSave(): boolean {
    const messages: string[] = [];
    if (state.user.people.length === 0) {
      messages.push("At least one Person is required to save.");
    } else if (state.user.people.indexOf("Other") === 0) {
      if (state.user.peopleOther === "") {
        messages.push(
          "For People - Other, the text description of Other must be entered.",
        );
      }
    }
    if (state.user.behavior.length === 0) {
      messages.push("At least one Behavior is required to save.");
    } else if (state.user.behavior.indexOf("Other") === 0) {
      if (state.user.behaviorOther === "") {
        messages.push(
          "For Behavior - Other, the text description of Other must be entered.",
        );
      }
    }
    if (state.user.consequence.length === 0) {
      messages.push("At least one Consequence is required to save.");
    } else if (state.user.consequence.indexOf("Other") === 0) {
      if (state.user.consequenceOther === "") {
        messages.push(
          "For Consequence - Other, the text description of Other must be entered.",
        );
      }
    }
    if (state.user.antecedent.length === 0) {
      messages.push("An Antecedent is required to save.");
    } else if (state.user.antecedent === "Other") {
      if (state.user.antecedentOther === "") {
        messages.push(
          "For Antecedent - Other, the text description of Other must be entered.",
        );
      }
    }
    if (state.user.location.length === 0) {
      messages.push("A Location is required to save.");
    }
    if (state.user.duration.length === 0) {
      messages.push("A Duration is required to save.");
    }
    if (state.user.intensity.length === 0) {
      messages.push("An Intensity is required to save.");
    }
    if (state.user.when.length === 0) {
      messages.push("The date and time of the ABC is required to save.");
    }
    setState({ ...state, messages });
    console.log(messages);
    return messages.length === 0;
  }

  function reset(): void {
    setState(initialState());
  }

  function toggleSelected(event, scope): void {
    const label = event.target.value;
    let currentState;
    const user = state.user;
    switch (scope) {
      case "people":
        currentState = state.user.people;
        currentState = updateArray(currentState, label);
        if (label === "Other") {
          user.peopleOtherLabelDisabled = !state.user.peopleOtherLabelDisabled;
        }
        user.people = currentState;
        break;
      case "behavior":
        currentState = state.user.behavior;
        currentState = updateArray(currentState, label);
        if (label === "Other") {
          user.behaviorOtherLabelDisabled =
            !state.user.behaviorOtherLabelDisabled;
        }
        user.behavior = currentState;
        break;
      case "consequence":
        currentState = state.user.consequence;
        currentState = updateArray(currentState, label);
        if (label === "Other") {
          user.consequenceOtherLabelDisabled =
            !state.user.consequenceOtherLabelDisabled;
        }
        user.consequence = currentState;
        break;
    }
    setState({ ...state, user });
  }

  function updateArray(currentState, label): ABCState {
    const index = currentState.indexOf(label);
    if (index > -1) {
      currentState.splice(index, 1);
    } else {
      currentState.push(label);
    }
    return currentState;
  }

  function setOtherLabelChange(event, scope): void {
    const otherLabelText = event.target.value;
    const user = state.user;
    switch (scope) {
      case "people":
        user.peopleOther = otherLabelText;
        break;
      case "behavior":
        user.behaviorOther = otherLabelText;
        break;
      case "consequence":
        user.consequenceOther = otherLabelText;
        break;
    }
    setState({ ...state, user });
  }

  return (
    <div>
      <h2 className="text-primary">ABC Checklist</h2>
      <div id="abcChecklist">
        <div className="row">
          <div className="col-md-1">
            <h4>When?</h4>
            <hr />
            <input
              className="btn btn-primary"
              onClick={getTime}
              type="button"
              value="Now"
              id="now"
            />
            <div id="dateTime">{state.user.when}</div>
          </div>
          <div className="col-md-4">
            <h4>Antecedent</h4>
            <hr />
            <b>What happened before the behavior?</b>
            <br />
            {antecedentValues.map((antecedent, i) => {
              return (
                <div className="radio" key={i}>
                  <label>
                    <input
                      type="radio"
                      value={antecedent}
                      onChange={antecedentRadios}
                      checked={state.user.antecedent === antecedent}
                    />
                    {antecedent}
                  </label>
                </div>
              );
            })}
            <div className="radio">
              <label>
                <input
                  type="radio"
                  checked={state.user.antecedent === "Other"}
                  value="Other"
                  onChange={antecedentRadios}
                />{" "}
                Other
              </label>
            </div>
            <input
              type="text"
              className="form-control"
              id="antecedentOther"
              value={state.user.antecedentOther}
              placeholder="Enter Description"
              onChange={antecedentOtherText}
              disabled={state.antecedentOtherDisabled}
            />
            <br /> <b>Location</b>
            <br />
            {locationValues.map((location, i) => {
              return (
                <div className="radio-inline" key={i}>
                  <label>
                    <input
                      type="radio"
                      onChange={locationRadios}
                      checked={state.user.location === location}
                      value={location}
                    />
                    {location}
                  </label>
                </div>
              );
            })}
            <br /> <b>People Present</b>
            <br />
            <CheckboxSeries
              labels={peopleValues}
              selected={state.user.people}
              otherLabelPlaceholder="Enter Another Person Present"
              otherLabelText={state.user.peopleOther}
              otherLabelDisabled={state.user.peopleOtherLabelDisabled}
              setOtherLabelChange={(event) => {
                setOtherLabelChange(event, "people");
              }}
              toggleSelected={(event) => {
                toggleSelected(event, "people");
              }}
            />
          </div>
          <div className="col-md-3">
            <h4>Behavior</h4>
            <hr />
            <b>Select all that apply</b>
            <CheckboxSeries
              labels={behaviorValues}
              selected={state.user.behavior}
              otherLabelPlaceholder="Enter Description"
              otherLabelText={state.user.behaviorOther}
              otherLabelDisabled={state.user.behaviorOtherLabelDisabled}
              setOtherLabelChange={(event) => {
                setOtherLabelChange(event, "behavior");
              }}
              toggleSelected={(event) => {
                toggleSelected(event, "behavior");
              }}
            />
            <br /> <b>Duration</b>
            <br />
            {durationValues.map((duration, i) => {
              return (
                <div className="radio-inline" key={i}>
                  <label>
                    <input
                      type="radio"
                      onChange={durationRadios}
                      checked={state.user.duration === duration}
                      value={duration}
                    />
                    {duration}
                  </label>
                </div>
              );
            })}
            <br /> <b>Intensity</b>
            <br />
            {intensityValues.map((intensity, i) => {
              return (
                <div className="radio-inline" key={i}>
                  <label>
                    <input
                      type="radio"
                      onChange={intensityRadios}
                      checked={state.user.intensity === intensity}
                      value={intensity}
                    />
                    {intensity}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <h4>Consequence</h4>
            <hr />
            <b>What happened after?</b>
            <br />
            <CheckboxSeries
              labels={consequenceValues}
              selected={state.user.consequence}
              otherLabelPlaceholder="Enter Description"
              otherLabelText={state.user.consequenceOther}
              otherLabelDisabled={state.user.consequenceOtherLabelDisabled}
              setOtherLabelChange={(event) => {
                setOtherLabelChange(event, "consequence");
              }}
              toggleSelected={(event) => {
                toggleSelected(event, "consequence");
              }}
            />
          </div>
        </div>
        <br />
        <div className="form-inline">
          <div className="form-group">
            <input
              className="btn btn-success form-control"
              type="submit"
              onClick={save}
              value="Save"
              id="save"
            />
          </div>
          <div className="form-group">
            <input
              className="btn btn-danger form-control"
              type="reset"
              onClick={reset}
              value="Reset"
              id="reset"
            />
          </div>
        </div>
      </div>
      <Modal show={state.showModal} onHide={close}>
        <Modal.Header>
          <p>ABC Save Results</p>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {state.messages.map((message, i) => {
              return <li key={i}>{message}</li>;
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <p style={{ right: "auto" }}>Click anywhere to continue</p>
        </Modal.Footer>
      </Modal>
      {/* <div id="abcModal" className="modal"> */}
      {/*  <div className="modal-dialog" role="document"> */}
      {/*    <div className="modal-content"> */}
      {/*      <div className="modal-header"> */}
      {/*        <p>ABC Save Results</p> */}
      {/*      </div> */}
      {/*      <div className="modal-body"> */}
      {/*        <ul> */}
      {/*          {state.messages.map((message, i) => { */}
      {/*            return <li key={i}>{message}</li>; */}
      {/*          })} */}
      {/*        </ul> */}
      {/*      </div> */}
      {/*      <div className="modal-footer"> */}
      {/*        <p style={{ right: "auto" }}>Click anywhere to continue</p> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </div> */}
    </div>
  );
}
