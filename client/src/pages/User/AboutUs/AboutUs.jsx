import React from "react";

//Bootstrap/css section
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
// import "../AboutUs/aboutUs.css"

const AboutUs = () => {
  return (
    <div className="home-container">
      <div className="teamIntro-container welcoming-section">
        <h1 className="first-title">
          Special Invitation for Your Special Day{" "}
        </h1>
        <p>
          You will know exactly the number of attendees or the amount of
          preparations for the wedding if you are using our app{" "}
        </p>
      </div>
      <div className="team-container">
        <div className="row g-5">
          <div className="team-card col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src="https://www.clipartmax.com/png/middle/0-884_big-image-man-and-woman-animated.png"
                alt="teamPic1"
                className="team-pic card-img-tom"
              />
              <p className="team-text card text">Say some thing about you</p>
              <h3 className="team-title card-title">Team Name </h3>
            </div>
          </div>

          <div className="team-card col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjm6jdsDe1XQfqhTRv1ekS2b2xMUZWw6OGX7vEC8dZIeCt0IRnj3Xg-2OMm42le6ivJlw&usqp=CAU"
                alt="teamPic1"
                className="team-pic card-img-tom"
              />
              <p className="team-text card text">Say some thing about you</p>
              <h3 className="team-title card-title">Team Name </h3>
            </div>
          </div>

          <div className="team-card col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src="https://www.clipartmax.com/png/middle/0-884_big-image-man-and-woman-animated.png"
                alt="teamPic1"
                className="team-pic card-img-tom"
              />
              <p className="team-text card text">Say some thing about you</p>
              <h3 className="team-title card-title">Team Name </h3>
            </div>
          </div>

          <div className="team-card col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjm6jdsDe1XQfqhTRv1ekS2b2xMUZWw6OGX7vEC8dZIeCt0IRnj3Xg-2OMm42le6ivJlw&usqp=CAU"
                alt="teamPic1"
                className="team-pic card-img-tom"
              />
              <p className="team-text card text">Say some thing about you</p>
              <h3 className="team-title card-title">Team Name </h3>
            </div>
          </div>

          <div className="team-card col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src="https://www.clipartmax.com/png/middle/0-884_big-image-man-and-woman-animated.png"
                alt="teamPic1"
                className="team-pic card-img-tom"
              />
              <p className="team-text card text">Say some thing about you</p>
              <h3 className="team-title card-title">Team Name </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
