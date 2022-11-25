import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import FormContainer from "../../Form/FormContainer/FormContainer";
import FormInput from "../../Form/FormInput/FormInput.jsx";
import FormSingleChoice from "../../Form/FormInput/FormSingleChoice";
import FormMultipleChoice from "../../Form/FormInput/FormMultipleChoice";
import { StepperContext } from "../../../contexts/StepperContext";

const QuestionForm = ({ form /* setForm */, isEventCreated }) => {
  const { next } = useContext(StepperContext);

  useEffect(() => {
    if (isEventCreated) {
      next();
    }
  }, [isEventCreated]);

  return (
    <FormContainer title="Create Your RSVP Questions">
      <form>
        {form?.map((question, index) => {
          return (
            <>
              {question.attributes.type === "text" && (
                <FormInput
                  key={question.key}
                  disabled
                  label={`${index + 1} - ${question.label}`}
                  required={question.attributes.required}
                  placeholder="free text"
                />
              )}
              {question.attributes.type === "email" && (
                <FormInput
                  key={question.key}
                  disabled
                  label={`${index + 1} - ${question.label}`}
                  required={question.attributes.required}
                  placeholder="email"
                />
              )}
              {question.attributes.type === "number" && (
                <FormInput
                  key={question.key}
                  disabled
                  label={`${index + 1} - ${question.label}`}
                  required={question.attributes.required}
                  placeholder="number"
                />
              )}
              {question.attributes.type === "singleChoice" && (
                <FormSingleChoice
                  key={question.key}
                  disabled
                  label={`${index + 1} - ${question.label}`}
                  required={question.attributes.required}
                  options={question.options}
                />
              )}
              {question.attributes.type === "multipleChoice" && (
                <FormMultipleChoice
                  key={question.key}
                  disabled
                  label={`${index + 1} - ${question.label}`}
                  required={question.attributes.required}
                  options={question.options}
                />
              )}
            </>
          );
        })}
      </form>
    </FormContainer>
  );
};

export default QuestionForm;

QuestionForm.propTypes = {
  form: PropTypes.array,
  setForm: PropTypes.func,
  isEventCreated: PropTypes.bool,
};
