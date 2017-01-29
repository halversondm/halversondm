/**
 * Created by Daniel on 6/30/2016.
 */
"use strict";

import * as React from "react";

export interface CheckboxSeriesProps {
    labels: Array<string>,
    selected: Array<string>,
    otherLabelPlaceholder: string,
    otherLabelText: string
}

interface CheckboxSeriesState {
    otherLabelText: string,
    otherLabelDisabled: boolean,
    selected: Array<string>
}

export class CheckboxSeries extends React.Component<CheckboxSeriesProps, CheckboxSeriesState> {

    public state: CheckboxSeriesState;

    public static defaultProps: CheckboxSeriesProps = {
        labels: [],
        selected: [],
        otherLabelPlaceholder: "",
        otherLabelText: ""
    };

    constructor(props : CheckboxSeriesProps) {
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
    }

    toggleSelected(event : any) {
        let label = event.target.value;
        let selected = this.state.selected;
        let index = selected.indexOf(label);
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
        let otherLabelDisabled = this.state.otherLabelDisabled;
        if (otherLabelDisabled) {
            otherLabelDisabled = false;
        } else {
            otherLabelDisabled = true;
        }
        this.setState({otherLabelDisabled: otherLabelDisabled});
    }

    otherLabelChange(event : any) {
        let otherLabelText = event.target.value;
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
