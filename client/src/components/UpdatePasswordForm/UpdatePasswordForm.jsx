import React, { useState } from "react";
import FormInput from "../InputForm/FormInput";
import useFetch from "../../hooks/useFetch.js";
const UpdatePasswordForm = () => {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const id = "";
  const token = "";

  const inputs = [
    {
      id: 1,
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
      id: 2,
      name: "confirmpassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords dont match",
      pattern: values.password,
      required: true,
    },
  ];
  const route = "user/:" + id + "/reset/:" + token;
  const { /* isLoading, error, */ performFetch /* cancelFetch */ } =
    useFetch(route);
  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password: values.password,
      }),
    };
    performFetch(options);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="verify-container">
      <div className="verify-box">
        <h1 className="verify-header">Reset your password!</h1>
        <p className="verify-text">
          Enter your email adress below and confirme it, to update your
          password.
        </p>
        <form className="verify-form" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              errorMessage={input.errorMessage}
            />
          ))}
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
