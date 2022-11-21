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
      <div className="verify-box">
        <h1 className="verify-header">Forgot your password?</h1>
        <p className="verify-text">
          Enter your registered email below to recive password reset link
        </p>
        <form className="verify-form" onSubmit={handleSubmit}>
          <FormInput
            key={input.id}
            {...input}
            value={value[input.name]}
            onChange={onChange}
            errorMessage={input.errorMessage}
          />
          <button
            type="submit"
            className="btn btn-outline-primary send-link-btn"
          >
            Send-link
          </button>
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
              <p>
                Dont receive email ?? ..{" "}
                <button
                  className="resend-email-button"
                  onClick={handleResendEmail}
                >
                  resend email
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
