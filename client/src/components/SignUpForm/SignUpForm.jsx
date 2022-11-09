import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import useFetch from "../../hooks/useFetch.js";
import FormInput from "../InputForm/FormInput.jsx";
import "./signupForm.css";
import Loading from "../Loading/Loading.jsx";
import ErrorMsg from "../ErrorMsg/ErrorMsg.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

const SignUpForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/homePage");
    }
  }, [shouldRedirect]);

  const route = "/user/register";
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
    <>
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
          <button disabled={isLoading}>Sign-up</button>
        </form>

        {isLoading ? <Loading /> : <></>}
      </div>
      {error ? <ErrorMsg error={error} /> : <></>}
    </>
  );
};

export default SignUpForm;
