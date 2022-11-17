import React, { useState } from "react";
import PropTypes from "prop-types";

import "./EventGuestForm.css";
const EventGuestForm = ({ onChange, onSubmit, formProps }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className="questionBox">
      <form onSubmit={onSubmit}>
        {formProps?.map((question, index) => {
          return (
            <div key={question.key} className="question">
              <div className="question-options">
                <div>
                  {index + 1} - {question.label}{" "}
                  {question.attributes.required && (
                    <span className="required">(required)</span>
                  )}
                </div>
                <div>
                  {question.attributes.type === "text" && (
                    <input
                      type="text"
                      name={question.key}
                      placeholder="free text"
                      onChange={onChange}
                      onBlur={handleFocus}
                      onFocus={handleFocus}
                      focused={focused.toString()}
                    ></input>
                  )}
                </div>
                {question.attributes.type === "email" && (
                  <input
                    type="email"
                    name={question.key}
                    placeholder="email"
                    onChange={onChange}
                    onBlur={handleFocus}
                    focused={focused.toString()}
                  ></input>
                )}
                {question.attributes.type === "number" && (
                  <input
                    type="number"
                    name={question.key}
                    placeholder="number"
                    min={question.attributes.min}
                    max={question.attributes.max}
                    onChange={onChange}
                    onBlur={handleFocus}
                    focused={focused.toString()}
                  ></input>
                )}
                {question.attributes.type === "singleChoice" &&
                  question.options.map((option) => {
                    return (
                      <div key={option.key} className="option">
                        <input
                          type="radio"
                          className="radio"
                          value={option.value}
                          name={question.key}
                          onChange={onChange}
                          focused={focused.toString()}
                        />{" "}
                        {option.value}
                      </div>
                    );
                  })}
                {question.attributes.type === "multipleChoice" &&
                  question.options.map((option) => {
                    return (
                      <div key={option.key} className="option">
                        <input
                          className="radio"
                          type="radio"
                          value={option.value}
                          name={question.key}
                          onChange={onChange}
                        />{" "}
                        {option.value}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
        <button>Submit</button>
      </form>
    </div>
  );
};

EventGuestForm.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  formProps: PropTypes.array,
};
export default EventGuestForm;
