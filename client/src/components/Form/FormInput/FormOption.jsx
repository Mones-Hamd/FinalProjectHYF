import React from "react";
import PropTypes from "prop-types";

const FormOption = ({ option, type, ...optionProps }) => {
  return (
    <div key={option.key} className="komje-form-option">
      <input
        type={type}
        value={option.value}
        name={option.key}
        {...optionProps}
      />{" "}
      {option.value}
    </div>
  );
};

export default FormOption;

FormOption.propTypes = {
  option: PropTypes.object,
  type: PropTypes.string,
};
