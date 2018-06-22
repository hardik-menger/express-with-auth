import React from "react";
import classnames from "classnames";
const SelectInput = props => {
  const options = props.options.map(singleoption => {
    return (
      <option key={singleoption.label} value={singleoption.value}>
        {singleoption.label}
      </option>
    );
  });
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error
        })}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {options}
      </select>
      {props.error && <div className="invalid-feedback">{props.error}</div>}
      {props.info && <div className="form-text text-muted">{props.info}</div>}
    </div>
  );
};
export default SelectInput;
