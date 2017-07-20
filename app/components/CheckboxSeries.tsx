/**
 * Created by Daniel on 6/30/2016.
 */
import * as React from "react";

export interface CheckboxSeriesProps {
    labels: string[];
    selected: string[];
    otherLabelPlaceholder: string;
    otherLabelText: string;
}

export interface CheckboxSeriesState {
    otherLabelText: string;
    otherLabelDisabled: boolean;
    selected: string[];
}

export class CheckboxSeries extends React.Component<CheckboxSeriesProps, CheckboxSeriesState> {

    public state: CheckboxSeriesState;

    public static defaultProps: CheckboxSeriesProps = {
        labels: [],
        selected: [],
        otherLabelPlaceholder: "",
        otherLabelText: "",
    };

    constructor(props: CheckboxSeriesProps) {
        super(props);
        this.state = {
            otherLabelText: this.props.otherLabelText,
            otherLabelDisabled: true,
            selected: this.props.selected,
        };
        this.toggleSelected = this.toggleSelected.bind(this);
        this.otherLabelText = this.otherLabelText.bind(this);
        this.otherLabelChange = this.otherLabelChange.bind(this);
        this.pullCurrentState = this.pullCurrentState.bind(this);
    }

    toggleSelected(event: any) {
        const label = event.target.value;
        const selected = this.state.selected;
        const index = selected.indexOf(label);
        if (index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push(label);
        }
        if (label === "Other") {
            this.otherLabelText();
        }
        this.setState({selected});
    }

    otherLabelText() {
        const otherLabelDisabled = !this.state.otherLabelDisabled;
        this.setState({otherLabelDisabled});
    }

    otherLabelChange(event: any) {
        const otherLabelText = event.target.value;
        this.setState({otherLabelText});
    }

    pullCurrentState() {
        return {
            selected: this.state.selected,
            otherLabelText: this.state.otherLabelText,
        };
    }

    reset() {
        this.setState({otherLabelText: "", selected: [], otherLabelDisabled: true});
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}
