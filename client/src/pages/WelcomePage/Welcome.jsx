import React from "react";
import free from "../WelcomePage/free.png";
import eco from "../WelcomePage/eco.png";
import fast from "../WelcomePage/fast.png";
import easy from "../WelcomePage/easy.png";
import Main from "../WelcomePage/components/Main/Main.jsx";
//import { Link } from "react-router-dom";
import "../WelcomePage/welcome.css";
const Welcome = () => {
  return (
    <div className="welcome">
      <div className="description">
        <h1>Planning the Wedding of Your Dreams Just Got Easier </h1>
      </div>
      <div className="desc1">
        <Main />

        <div className="desc1-container">
          <p>
            {" "}
            You are getting married, what a great news! We know there are many
            questions in your mind to live this special moment perfectly. Enjoy
            your wedding because we are here for you! We have the answers to all
            your questions about your guests. Click, create, send and see the
            answers.
          </p>
        </div>
      </div>
      <div>
        <div className="description">
          <h1>WHY KOMJE? </h1>
        </div>
      </div>
      <div className="aboutApp">
        <div className="free">
          <img src={free} className="about-section" />
        </div>
        <div className="simple">
          <img src={eco} className="about-section" />
        </div>
        <div className="tree">
          <img src={fast} className="about-section" />
        </div>
        <div className="easy">
          <img src={easy} className="about-section" />
        </div>
      </div>
    </div>
  );
};
export default Welcome;
