/**
 * Created by Daniel on 6/30/2016.
 */
"use strict";

import React, {Component} from "react";

class CheckboxSeries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            otherLabelText: this.props.otherLabelText,
            otherLabelDisabled: true,
            selected: this.props.selected
        };
        this.toggleSelected = this.toggleSelected.bind(this);
        this.otherLabelText = this.otherLabelText.bind(this);
        this.otherLabelChange = this.otherLabelChange.bind(this);
        this.pullCurrentState = this.pullCurrentState.bind(this);
        this.reset = this.reset.bind(this);
    }

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
    }

    otherLabelText() {
        var otherLabelDisabled = this.state.otherLabelDisabled;
        if (otherLabelDisabled) {
            otherLabelDisabled = false;
        } else {
            otherLabelDisabled = true;
        }
        this.setState({otherLabelDisabled: otherLabelDisabled});
    }

    otherLabelChange(event) {
        var otherLabelText = event.target.value;
        this.setState({otherLabelText: otherLabelText});
    }

    pullCurrentState() {
        return {
            selected: this.state.selected,
            otherLabelText: this.state.otherLabelText
        };
    }

    reset() {
        this.setState({otherLabelText: "", selected: [], otherLabelDisabled: true});
    }

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
}

CheckboxSeries.propTypes = {
    labels: React.PropTypes.array,
    selected: React.PropTypes.array,
    otherLabelPlaceholder: React.PropTypes.string,
    otherLabelText: React.PropTypes.string,
    reset: React.PropTypes.bool
};

CheckboxSeries.defaultProps = {
    labels: [],
    selected: [],
    otherLabelPlaceholder: "",
    otherLabelText: "",
    reset: false
};

export default CheckboxSeries;
