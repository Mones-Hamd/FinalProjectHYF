import React from "react";
import PropTypes from "prop-types";

const FormOption = ({
  optionKey,
  checked,
  type,
  disabled,
  onChange,
  ...optionProps
}) => {
  return (
    <div key={optionKey} className="komje-form-option">
      <input
        type={type}
        name={optionKey}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        {...optionProps}
      />{" "}
      {optionKey}
    </div>
  );
};

export default FormOption;

FormOption.propTypes = {
  optionKey: PropTypes.string,
  checked: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
