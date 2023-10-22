/**
 * Created by Daniel on 6/30/2016.
 */
import * as React from 'react'
import { type ReactNode } from 'react'

export interface CheckboxSeriesProps {
  labels: string[]
  selected: string[]
  otherLabelPlaceholder: string
  otherLabelText: string
}

export interface CheckboxSeriesState {
  otherLabelText: string
  otherLabelDisabled: boolean
  selected: string[]
}

export class CheckboxSeries extends React.Component<CheckboxSeriesProps, CheckboxSeriesState> {
  public state: CheckboxSeriesState

  public static defaultProps: CheckboxSeriesProps = {
    labels: [],
    selected: [],
    otherLabelPlaceholder: '',
    otherLabelText: ''
  }

  constructor (props: CheckboxSeriesProps) {
    super(props)
    this.state = {
      otherLabelText: this.props.otherLabelText,
      otherLabelDisabled: true,
      selected: this.props.selected
    }
    this.toggleSelected = this.toggleSelected.bind(this)
    this.otherLabelText = this.otherLabelText.bind(this)
    this.otherLabelChange = this.otherLabelChange.bind(this)
    this.pullCurrentState = this.pullCurrentState.bind(this)
  }

  toggleSelected (event): void {
    const label = event.target.value
    const selected = this.state.selected
    const index = selected.indexOf(label)
    if (index > -1) {
      selected.splice(index, 1)
    } else {
      selected.push(label)
    }
    if (label === 'Other') {
      this.otherLabelText()
    }
    this.setState({ selected })
  }

  otherLabelText (): void {
    const otherLabelDisabled = !this.state.otherLabelDisabled
    this.setState({ otherLabelDisabled })
  }

  otherLabelChange (event): void {
    const otherLabelText = event.target.value
    this.setState({ otherLabelText })
  }

  pullCurrentState (): CheckboxSeriesState {
    return this.state
  }

  reset (): void {
    this.setState({ otherLabelText: '', selected: [], otherLabelDisabled: true })
  }

  render (): ReactNode {
    return (
            <div>
                {
                    this.props.labels.map((label, i) => {
                      return <div className="checkbox" key={i}>
                            <label>
                                <input id={label} name="selectedLabel[]" type="checkbox"
                                       value={label}
                                       checked={this.state.selected.includes(label)}
                                       onClick={this.toggleSelected}/> {label}
                            </label>
                        </div>
                    })
                }
                <div className="checkbox">
                    <label>
                        <input id="otherLabel" type="checkbox" name="selectedLabel[]"
                               checked={this.state.selected.includes('Other')}
                               value="Other"
                               onClick={this.toggleSelected}/> Other
                    </label>
                </div>
                <input type="text" className="form-control" id="labelOther"
                       value={this.state.otherLabelText} onChange={this.otherLabelChange}
                       placeholder={this.props.otherLabelPlaceholder}
                       disabled={this.state.otherLabelDisabled}/>
            </div>
    )
  }
}
