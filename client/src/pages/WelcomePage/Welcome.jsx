import React from "react";
import "../WelcomePage/welcome.css";

const Welcome = () => {
  return (
    <>
      <h1>This is welcome page</h1>
      <video autoPlay muted loop id="myVideo">
        <source src="./images/background.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </>
  );
};

export default Welcome;
