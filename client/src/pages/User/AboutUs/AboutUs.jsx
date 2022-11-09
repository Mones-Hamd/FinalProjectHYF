import React from "react";

//Bootstrap/css section
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../AboutUs/aboutUs.css";

import beyzaPic from "./teamImg/beyza.jpg";
import baraahPic from "./teamImg/baraah.jpg";
import monesPic from "./teamImg/mones.jpg";
import akinPic from "./teamImg/akin.jpg";
import abdullaPic from "./teamImg/abdulla.jpg";

const AboutUs = () => {
  return (
    <div className="home-container">
      <div className="teamIntro-container welcoming-section">
        <p className="first-team-title">
          Special Invitation for Your Special Day
        </p>
        <p className="aboutUs-paragraph">
          You will know exactly the number of attendees or the amount of
          preparations for the wedding if you are using our app{" "}
        </p>
      </div>
      <div className="team-container">
        <div className="row g-5">
          <div className="team-card col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src={monesPic}
                alt="teamPic1"
                className="team-pic card-img-tom"
              />
              <p className="team-text card text">Say some thing about you</p>
              <p className="team-title card-title">Mones</p>
            </div>
          </div>

          <div className="team-card col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src={beyzaPic}
                alt="teamPic1"
                className="team-pic card-img-tom"
              />
              <p className="team-text card text">Say some thing about you</p>
              <p className="team-title card-title">Beyza</p>
            </div>
          </div>

          <div className="team-card col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src={abdullaPic}
                alt="teamPic1"
                className="team-pic card-img-tom"
              />
              <p className="team-text card text">Say some thing about you</p>
              <p className="team-title card-title">Abdullah</p>
            </div>
          </div>

          <div className="team-card col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src={baraahPic}
                alt="teamPic1"
                className="team-pic card-img-tom"
              />
              <p className="team-text card text">Say some thing about you</p>
              <p className="team-title card-title">Baraah</p>
            </div>
          </div>

          <div className="team-card col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src={akinPic}
                alt="teamPic1"
                className="team-pic card-img-tom"
              />
              <p className="team-text card text">Say some thing about you</p>
              <p className="team-title card-title">Akın</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
