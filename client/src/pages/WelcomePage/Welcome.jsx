import React from "react";
import free from "../WelcomePage/Images/free.png";
import eco from "../WelcomePage/Images/eco.png";
import fast from "../WelcomePage/Images/fast.png";
import easy from "../WelcomePage/Images/easy.png";
import photo from "../WelcomePage/Images/photo3.jpg";
import Main from "../WelcomePage/components/Main/Main.jsx";
import { Link } from "react-router-dom";
import "../WelcomePage/welcome.css";
import Review from "../WelcomePage/components/Reviews/Reviews";
const Welcome = () => {
  return (
    <div className="welcome">
      <div className="header">
        <div className="header-text-box">
          <p>
            While you are getting ready for your dreams come true , do not
            stress for letting your relatives and friends know about your
            wedding! We are here for you,just enjoy and celebrate it with your
            relatives and friends.
          </p>
        </div>
        <div className="image-container">
          <img src={photo} className="hero-img" alt="hero-image"></img>
        </div>
      </div>
      <div className="description">
        <h1 className="description">
          Planning the Wedding of Your Dreams Just Got Easier
        </h1>
      </div>
      <div className="desc1">
        <Main />
        <div className="desc1-container">
          <p>
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
          <h1 className="description">ADVANTAGES OF USING THE KOMJE ! </h1>
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
      </div>{" "}
      <div className="down">
        <div className="down-container">
          <h1 className="par-2">Ready When You Are</h1>
          <Link to="/register">
            <button className="btn-down">Get Started</button>
          </Link>
        </div>
      </div>
      <main>
        <section className="container">
          <div className="title">
            <h2>Our Reviews</h2>
            <div className="underline1"></div>
          </div>
          <Review />
        </section>
      </main>
    </div>
  );
};
export default Welcome;
