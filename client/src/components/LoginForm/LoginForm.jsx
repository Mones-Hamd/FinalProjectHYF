import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import { UserContext } from "../../contexts/userContext.jsx";
import useFetch from "../../hooks/useFetch.js";
import FormInput from "../InputForm/FormInput.jsx";
import "./LoginForm.css";

import Loading from "../Loading/Loading.jsx";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../ErrorMsg/ErrorMsg.jsx";

const LoginForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { user, setUser } = useContext(UserContext);
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
    setUser({
      userId: decoded.sub,
      email: decoded.email,
      username: decoded.username,
      isVerified: decoded.idVerified,
      isActive: decoded.isActive,
      lastLoginDate: decoded.lastLoginDate,
      expirationDate: decoded.exp,
      token: result.token,
    });
    localStorage.setItem("user", user);
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
            Remember me <input type="checkbox" className="input-check-box" />{" "}
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
