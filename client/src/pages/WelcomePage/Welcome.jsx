import React from "react";
import free from "../WelcomePage/Images/free.png";
import eco from "../WelcomePage/Images/eco.png";
import fast from "../WelcomePage/Images/fast.png";
import easy from "../WelcomePage/Images/easy.png";
import photo from "../WelcomePage/Images/photo3.jpg";

import { Link } from "react-router-dom";
import "../WelcomePage/welcome.css";
import Review from "../../components/Review/Reviews";
import background from "./Images/background.jpg";
const Welcome = () => {
  return (
    <div className="welcome">
      <div className="header">
        <div className="header-text-box">
          <h1 className="par-2">Ready When You Are</h1>
          <p className="paragraph-app text ">
            We know how important and valuable every minute of your dream day.
            So, why don`t you save yourself the stress, while you are getting
            ready for your wedding, We are here for you, just enjoy and
            celebrate it with your beloved ones, while you can track with KOMJE
            all the details you need.
          </p>
          <div className="btn-div">
            <Link to="/register">
              <button className="btn-down btn-app">Get Started</button>
            </Link>
          </div>
        </div>
        <div className="image-container">
          <img src={photo} className="welcome-img" alt="hero-image"></img>
        </div>
      </div>

      <div className="description">
        <h1 className="description">Wedding of Your Dreams Just Got Easier</h1>
      </div>
      <div className="desc1">
        <div className="main1">
          <img className="imagePhoto" alt="" src={background} />
        </div>
        <div className="desc1-container">
          <p className="paragraph-app text ">
            You are getting married, what a great news! We know there are many
            questions in your mind.Enjoy your wedding because we are here for
            you! Click, create, send and see all the answers you want from your
            guests.
          </p>
        </div>
      </div>
      <div>
        <div className="description">
          <h1 className="description">ADVANTAGES OF USING KOMJE ! </h1>
        </div>
      </div>

      <div className="aboutApp">
        <div className="free">
          <img src={free} className="about-section" />
        </div>
        <div className="free">
          <img src={eco} className="about-section" />
        </div>
        <div className="free">
          <img src={fast} className="about-section" />
        </div>
        <div className="free">
          <img src={easy} className="about-section" />
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
