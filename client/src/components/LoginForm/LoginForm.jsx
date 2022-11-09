import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import useFetch from "../../hooks/useFetch.js";
import FormInput from "../InputForm/FormInput.jsx";
import "./LoginForm.css";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import Loading from "../Loading/Loading.jsx";

import ErrorMsg from "../ErrorMsg/ErrorMsg.jsx";

const LoginForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [checked, setChecked] = React.useState(false);
  const handleChangeCheckBox = () => {
    setChecked(!checked);
    if (!checked) {
      localStorage.setItem("remember", values.email);
    } else {
      localStorage.removeItem("remember");
    }
  };

  useEffect(() => {
    const rememberMeEmail = localStorage.getItem("remember");

    if (rememberMeEmail) {
      setChecked(true);
      setValues({ email: rememberMeEmail });
    } else {
      setValues({ email: "" });
    }
  }, []);

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/homePage");
    }
  }, [shouldRedirect]);

  const route = "/user/login";
  const onReceived = (result) => {
    const token = result.token.replace("Bearer ", "");
    var decoded = jwt_decode(token);
    localStorage.setItem("user", JSON.stringify(decoded));
    localStorage.setItem("token", JSON.stringify(token));
    dispatch({ type: "LOGIN", payload: JSON.stringify(decoded) });
    setShouldRedirect(true);
  };

  const { isLoading, error, performFetch /* cancelFetch */ } = useFetch(
    route,
    onReceived
  );

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

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    };
    performFetch(options);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              errorMessage={input.errorMessage}
            />
          ))}

          <p>
            Remember me{" "}
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChangeCheckBox}
              className="input-check-box"
            />{" "}
          </p>
          <button disabled={isLoading}>Login</button>
          <p>
            Dont have an account ,create an account{" "}
            <a href="/register"> here!</a>
          </p>
          <p>
            <a>Forgot the password?</a>
          </p>
        </form>
        {isLoading ? <Loading /> : <></>}
      </div>

      {error ? <ErrorMsg error={error} /> : <></>}
    </>
  );
};

export default LoginForm;
