/**
 * Created by Daniel on 6/30/2016.
 */
import * as React from "react";
import { type ReactNode } from "react";

export interface CheckboxSeriesProps {
  labels: string[];
  selected: string[];
  otherLabelPlaceholder: string;
  otherLabelText: string;
  otherLabelDisabled: boolean;
  toggleSelected: (event) => void;
  setOtherLabelChange: (event) => void;
}

export default function CheckboxSeries({
  labels,
  selected,
  otherLabelPlaceholder,
  otherLabelText,
  otherLabelDisabled,
  toggleSelected,
  setOtherLabelChange,
}: CheckboxSeriesProps): ReactNode {
  return (
    <>
      {labels.map((label, i) => {
        return (
          <div className="checkbox" key={i}>
            <label>
              <input
                id={label}
                name="selectedLabel"
                type="checkbox"
                value={label}
                checked={selected.includes(label)}
                onChange={toggleSelected}
              />{" "}
              {label}
            </label>
          </div>
        );
      })}
      <div className="checkbox">
        <label>
          <input
            id="otherLabel"
            type="checkbox"
            name="otherLabelCheckbox"
            checked={selected.includes("Other")}
            value="Other"
            onChange={toggleSelected}
          />{" "}
          Other
        </label>
      </div>
      <input
        type="text"
        className="form-control"
        id="labelOther"
        value={otherLabelText}
        onChange={setOtherLabelChange}
        placeholder={otherLabelPlaceholder}
        disabled={otherLabelDisabled}
      />
    </>
  );
}
