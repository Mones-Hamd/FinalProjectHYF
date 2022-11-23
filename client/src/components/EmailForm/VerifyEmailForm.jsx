import React, { useState } from "react";
import FormInput from "../InputForm/FormInput";
import useFetch from "../../hooks/useFetch";
import Spinner from "../Spinner/Spinner";
import "./VerifyEmailForm.css";
const VerifyEmailForm = () => {
  const [value, setValue] = useState({
    email: "",
  });
  const [message, setMessage] = useState(null);
  const onReceived = (result) => {
    setMessage(result.message);
  };
  const route = "/user/forgotPassword";
  const { isLoading, error, performFetch /* cancelFetch */ } = useFetch(
    route,
    onReceived
  );
  const input = {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Type your Email Adress here!",
    errorMessage: "It should be a valid email address!",
    required: true,
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: value.email,
      }),
    };
    performFetch(options);
  };
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleResendEmail = (e) => {
    handleSubmit(e);
  };
  return (
    <div className="verify-container">
      <div className="verify-box form-app">
        <h1 className="verify-header">Forgot your password?</h1>
        <p className="verify-text">
          Enter your registered email below to receive password reset link
        </p>
        <form className="verify-form" onSubmit={handleSubmit}>
          <FormInput
            key={input.id}
            {...input}
            value={value[input.name]}
            onChange={onChange}
            errorMessage={input.errorMessage}
          />
          <div className="btn-box">
            <button type="submit" className="btn-app  send-link-btn">
              Send-link
            </button>
          </div>
        </form>
        <div>
          {isLoading && <Spinner />}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {message && (
            <div>
              <div className="alert alert-success" role="alert">
                {message}
              </div>

              <div className="btn-box">
                <button
                  className="resend-email-button btn-app "
                  onClick={handleResendEmail}
                >
                  resend email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
