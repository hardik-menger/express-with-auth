import React from "react";
import classnames from "classnames";
const TextAreaInput = props => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error
        })}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      {props.error && <div className="invalid-feedback">{props.error}</div>}
      {props.info && <div className="form-text text-muted">{props.info}</div>}
    </div>
  );
};
export default TextAreaInput;
