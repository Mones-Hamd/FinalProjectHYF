import React, { useContext, useState } from "react";
import jwt_decode from "jwt-decode";

import { UserContext } from "../../contexts/userContext.jsx";
import useFetch from "../../hooks/useFetch.js";
import FormInput from "../InputForm/FormInput.jsx";
import "./LoginForm.css";

const LoginForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { setUser } = useContext(UserContext);

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
  };

  const { /* isLoading, error, */ performFetch /* cancelFetch */ } = useFetch(
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
  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password,
      }),
    };
    performFetch(options);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
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
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
