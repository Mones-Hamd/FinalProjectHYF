import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import "./formInputWedding.css";

const InputWeddingForm = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="event-line">
      <label className="event-line-title">{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />

      <span className="event-line-error-message">{errorMessage}</span>
    </div>
  );
};

InputWeddingForm.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
};
export default InputWeddingForm;
