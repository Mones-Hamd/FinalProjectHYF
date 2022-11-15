import React from "react";

import Main from "../WelcomePage/components/Main";
//import { Link } from "react-router-dom";
import "../WelcomePage/welcome.css";
const Welcome = () => {
  return (
    <div className="welcome">
      <div className="desc1">
        <Main />

        <div className="desc1-container">
          <p>
            {" "}
            You are getting married, what great news! We know there are many
            questions in your mind to live this special moment perfectly. Enjoy
            your wedding because we are here for you! We have the answers to all
            your questions about your guests. Click, create, send and see the
            answers.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
