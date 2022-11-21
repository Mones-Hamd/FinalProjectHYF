import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";
const VerifyEmail = ({ userId, token }) => {
  const [message, setMessage] = useState("");
  const route = `/user/${userId}/verify/${token}`;
  const onReceived = (result) => {
    setMessage(result.message);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    route,
    onReceived
  );
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };
    performFetch(options);

    return cancelFetch;
  }, []);
  return (
    <div>
      {isLoading && <Spinner />}
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};
VerifyEmail.propTypes = {
  userId: PropTypes.string,
  token: PropTypes.string,
};
export default VerifyEmail;
