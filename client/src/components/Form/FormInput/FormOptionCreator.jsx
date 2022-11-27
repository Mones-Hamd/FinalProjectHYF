import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import FormInput from "./FormInput";
import Button from "../../Button/Button";

const FormOptionCreator = ({
  type,
  options,
  onChangeOption,
  deleteOption,
  disabled,
}) => {
  const createOptionKey = () => {
    let length = options.length;
    while (options.some((o) => Object.keys(o)[0].split("_")[1] == length)) {
      length++;
    }
    return `option_${length}`;
  };

  const addOption = () => {
    onChangeOption(createOptionKey(), "");
  };

  useEffect(() => {
    while (options.length < 2) {
      addOption();
    }
  }, []);

  return (
    <div className="options">
      {options.map((option, index) => {
        const key = Object.keys(option)[0];
        const value = option[key];
        return (
          <div key={key} className="option">
            <input type={type} disabled />
            <FormInput
              disabled={disabled}
              label={`${index + 1}. option`}
              placeholder="Enter an option"
              required
              errorMessage="At least 2 options required."
              onChange={(e) => onChangeOption(key, e.target.value)}
              value={value}
            />
            {index > 1 && (
              <FaTrash
                className={"option-delete-icon"}
                onClick={() => deleteOption(option)}
                size={20}
              />
            )}
          </div>
        );
      })}
      <div className="button-container">
        {!disabled && (
          <Button label="Add Option" type="button" onClick={addOption} />
        )}
      </div>
    </div>
  );
};

export default FormOptionCreator;

FormOptionCreator.propTypes = {
  type: PropTypes.string,
  options: PropTypes.array,
  onChangeOption: PropTypes.func,
  deleteOption: PropTypes.func,
  disabled: PropTypes.bool,
};
