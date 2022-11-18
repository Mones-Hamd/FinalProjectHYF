import React, { useState, useEffect } from "react";
import FormInput from "../InputForm/FormInput.jsx";
import "./signupForm.css";

import ErrorMsg from "../ErrorMsg/ErrorMsg.jsx";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../Spinner/Spinner.jsx";

const SignUpForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register } = useAuth();
  const { isLoading, error, performRegister, cancelFetch } = register;

  useEffect(() => {
    return cancelFetch;
  }, []);

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    performRegister({
      email: values.email,
      username: values.username,
      password: values.password,
    });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="signup-box">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="create-title">Create new account</h2>
          <hr />
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              errorMessage={input.errorMessage}
            />
          ))}
          <button className="sign-up-btn" disabled={isLoading}>
            Sign-up
          </button>
        </form>
        {error ? <ErrorMsg error={error} /> : <></>}
        {isLoading ? <Spinner /> : <></>}
      </div>
    </>
  );
};

export default SignUpForm;
