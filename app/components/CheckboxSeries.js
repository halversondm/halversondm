/**
 * Created by Daniel on 6/30/2016.
 */
"use strict";

import React from "react";

const CheckboxSeries = React.createClass({

  propTypes: {
    labels: React.PropTypes.array,
    selected: React.PropTypes.array,
    otherLabelPlaceholder: React.PropTypes.string,
    otherLabelText: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      labels: [],
      selected: [],
      otherLabelPlaceholder: "",
      otherLabelText: ""
    };
  },

  getInitialState() {
    return {
      otherLabelText: this.props.otherLabelText,
      otherLabelDisabled: true,
      selected: this.props.selected
    };
  },

  toggleSelected(event) {
    var label = event.target.value;
    var selected = this.state.selected;
    var index = selected.indexOf(label);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(label);
    }
    if (label === "Other") {
      this.otherLabelText();
    }
    this.setState({selected: selected});
  },
  otherLabelText() {
    var otherLabelDisabled = this.state.otherLabelDisabled;
    if (otherLabelDisabled) {
      otherLabelDisabled = false;
    } else {
      otherLabelDisabled = true;
    }
    this.setState({otherLabelDisabled: otherLabelDisabled});
  },
  otherLabelChange(event) {
    var otherLabelText = event.target.value;
    this.setState({otherLabelText: otherLabelText});
  },
  render() {
    return <div>
      {
        this.props.labels.map((label, i) => {
          return <div className="checkbox" key={i}>
            <label>
              <input id={label} name="selectedLabel[]" type="checkbox"
                     value={label}
                     checked={this.state.selected.indexOf(label) > -1}
                     onClick={this.toggleSelected}/> {label}
            </label>
          </div>;
        })
      }
      <div className="checkbox">
        <label>
          <input id="otherLabel" type="checkbox" name="selectedLabel[]"
                 checked={this.state.selected.indexOf("Other") > -1}
                 value="Other"
                 onClick={this.toggleSelected}/> Other
        </label>
      </div>
      <input type="text" className="form-control" id="labelOther"
             value={this.state.otherLabelText} onChange={this.otherLabelChange}
             placeholder={this.props.otherLabelPlaceholder}
             disabled={this.state.otherLabelDisabled}/>
    </div>;
  }
});

export default CheckboxSeries;
