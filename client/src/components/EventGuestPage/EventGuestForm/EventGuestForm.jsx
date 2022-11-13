import React, { useState } from "react";
import FormInput from "../../InputForm/FormInput";
import "./EventGuestForm.css";

function EventGuestForm() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    response: "",
    numberOfPeople: "",
    diet: "",
    car: "",
  });

  const inputs = [
    {
      key: "fullName",
      name: "fullName",
      label: "Please enter your full name",
      type: "text",
      placeholder: "Full Name",
      errorMessage:
        "User name should be 3-16 characters and should not include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      key: "email",
      name: "email",
      label: "Please enter your email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
    },

    {
      key: "numberOfPeople",
      name: "numberOfPeople",
      label: "How many people are you coming with?",
      type: "number",
      placeholder: "0-5 people",
      errorMessage: "Should  not be more than 5 people",
      required: true,
      min: 0,
      max: 5,
    },
  ];
  const questions = [
    {
      key: "response",
      name: "response",
      label: "Are you going to join us ?",
      type: "radio",
      placeholder: "",
      errorMessage: "Please choose a response",
      required: true,
      options: [
        {
          answer: "yes",
        },
        {
          answer: "no",
        },
      ],
    },
    {
      key: "diet",
      name: "diet",
      label: "Please select your diet",
      type: "radio",
      placeholder: "0-5 people",
      errorMessage: "Should  not be more than 5 people",
      required: true,
      options: [
        {
          answer: "Vegetarian",
        },
        {
          answer: "Vegan",
        },
        {
          answer: "Halal",
        },
        {
          answer: "Normal",
        },
      ],
    },
    {
      key: "car",
      name: "car",
      label: "Will you come with your own car?",
      type: "radio",
      placeholder: "",
      errorMessage: "Please choose a response",
      required: true,
      options: [
        {
          answer: "yes",
        },
        {
          answer: "no",
        },
      ],
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="textAnswers">
          {inputs.map((input) => (
            <div key={input.name}>
              <label key={input.label}>{input.label}</label>
              <FormInput
                key={input.key}
                {...input}
                value={values[input.name]}
                onChange={onChange}
                errorMessage={input.errorMessage}
              />
            </div>
          ))}
        </div>

        <div className="questions">
          {questions.map((question) => (
            <div key={question.name} className="questionBox">
              <p key={question.label}>{question.label}</p>
              {question.options.map((option) => (
                <div key={option.answer}>
                  <input
                    name={question.key}
                    key={question.key}
                    type="radio"
                    value={option.answer}
                    onChange={onChange}
                  />
                  <label key={option.answer}>{option.answer}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EventGuestForm;
