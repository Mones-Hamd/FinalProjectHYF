import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import FormContainer from "../../Form/FormContainer/FormContainer";
import { StepperContext } from "../../../contexts/StepperContext";
import Button from "../../Button/Button";
import FormQuestion from "../../Form/FormInput/FormQuestion";

const QuestionsForm = ({ form, setForm, isEventCreated }) => {
  const { next } = useContext(StepperContext);
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    if (isEventCreated) {
      next();
    }
  }, [isEventCreated, form]);

  const questionModel = {
    key: `question_${counter}`,
    label: "",
    attributes: {
      required: false,
      type: "text",
    },
    options: [],
  };

  const addQuestion = () => {
    setForm((form) => {
      const newForm = [...form, questionModel];
      return newForm;
    });
    setCounter((counter) => counter + 1);
  };

  const setQuestion = (question) => {
    setForm((form) => {
      const index = form.findIndex((q) => q.key === question.key);
      form.splice(index, 1, question);
      return Object.assign([], form);
    });
  };

  const deleteQuestion = (key) => {
    setForm((form) => {
      const newForm = form.filter((q) => q.key !== key);
      return newForm;
    });
  };

  return (
    <FormContainer title="Create Your RSVP Questions">
      <form>
        {form?.map((question, index) => {
          return (
            <FormQuestion
              key={`question_${index}`}
              index={index}
              question={question}
              setQuestion={setQuestion}
              deleteQuestion={deleteQuestion}
              disabled={index < 3}
            />
          );
        })}
        <Button label={"Add"} type="button" onClick={addQuestion} />
      </form>
    </FormContainer>
  );
};

export default QuestionsForm;

QuestionsForm.propTypes = {
  form: PropTypes.array,
  setForm: PropTypes.func,
  isEventCreated: PropTypes.bool,
};
