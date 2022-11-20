import React, { useState, useEffect } from "react";
import FormInput from "../InputForm/FormInput.jsx";
import "./LoginForm.css";
import { useAuth } from "../../hooks/useAuth.jsx";

import ErrorMsg from "../ErrorMsg/ErrorMsg.jsx";
import Spinner from "../Spinner/Spinner.jsx";

const REMEMBER_ME = "REMEMBER_ME";

const LoginForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: localStorage.getItem(REMEMBER_ME) || "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useAuth();
  const { isLoading, error, performLogin, cancelFetch } = login;
  const [checked, setChecked] = useState(
    localStorage.getItem(REMEMBER_ME) !== null
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const inputs = [
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
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem(REMEMBER_ME, values.email);
    performLogin({
      email: values.email,
      password: values.password,
    });
  };

  const handleChangeCheckBox = () => {
    setChecked((checked) => !checked);
    if (checked) {
      localStorage.removeItem(REMEMBER_ME);
    } else {
      localStorage.setItem(REMEMBER_ME, values.email);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="login-box">
        <div className="form-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="log-title">Login</h2>

            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
                errorMessage={input.errorMessage}
              />
            ))}

            <div className="remember-box">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChangeCheckBox}
                className="input-check-box"
              />
              <label className="remeber-me">Remember me</label>
            </div>
            <div className="btn-box">
              <button className="log-in-btn" disabled={isLoading}>
                Login
              </button>
            </div>

            <label className="new-account-link ">
              Don`t have an account ,create an account{" "}
              <a href="/register"> here!</a>
            </label>
          </form>
        </div>

        {isLoading ? <Spinner /> : <></>}
      </div>

      {error ? <ErrorMsg error={error} /> : <></>}
    </>
  );
};

export default LoginForm;
