import React, { useState } from "react";
import FormInput from "./FormInput.jsx";
import "./signupForm.css";
const SignUpForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "User Name",
      errorMessage:
        "User name should be 3-16 characters and should not include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern:
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,20}$",
      required: true,
    },
    {
      id: 4,
      name: "confirmpassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords dont match",
      pattern: values.password,
      required: true,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-box">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Create new account</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            errorMessage={input.errorMessage}
          />
        ))}
        <button>Sign-up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
