import React from "react";
import { Link } from "react-router-dom";
//Bootstrap/css section
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../WelcomePage/welcome.css";
const Welcome = () => {
  return (
    <div className="home-container">
      <div className="welcoming-section">
        <p className="first-title">WELCOME TO KOMJE</p>
        <p className="welcoming-paragraph">
          We are here for your wedding invitation!
          <hr /> Create your invitation form online get the answers from your
          guests, be ready, see the participants and have fun at your wedding
        </p>
        <div className="btn-container">
          <Link className=" getStart-btn" to="/register">
            Get start
          </Link>
        </div>
        <div></div>
      </div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://www.moooveventservices.com/wp-content/uploads/2020/04/KatieandBen-ceremony-1200px-1-1200x800.jpeg"
              className="d-block w-100"
              id="Wedding-pic"
              alt="Wedding-pic"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://mediafiles.beckyharleyphotography.co.uk/uploads/2018/08/tips-for-wedding-confetti-030.jpg"
              className="d-block w-100 "
              id="Wedding-pic"
              alt="Wedding-pic"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn0.weddingwire.com/vendor/697699/3_2/640/jpg/charlottesville-wedding-photography-portfolio7-of-34_51_996796-160632768959530.webp"
              className="d-block w-100 "
              id="Wedding-pic"
              alt="Wedding-pic"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="welcoming-section share-section">
        <p className="first-title">Share your invitations in seconds</p>
        <p className="welcoming-paragraph">
          Whether you want to share your invitations on social media or by
          email, our free invitation app lets you share effortlessly.
        </p>
      </div>
      <div className="share-section2">
        <p>
          Create beautiful invitations form. Download,or send it online
          <br />
          So easy!
        </p>
      </div>
    </div>
  );
};
export default Welcome;
