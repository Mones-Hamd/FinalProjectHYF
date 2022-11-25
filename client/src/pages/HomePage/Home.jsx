import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEvent } from "../../hooks/useEvent";
import "./home.css";
import Card from "../../components/HomaPage/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import komjeImg from "./img/komje.png";
import Button from "../../components/Button/Button";

const Home = () => {
  const { events, getAll } = useEvent();
  const navigate = useNavigate();
  const wedding =
    "https://www.marys.com/uploads/filemanager/blogs/Sty-Add-Photo-Gallery-Wedding-Invitation-Design-Ideas.jpg";

  const goToPrevious = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 300;
  };
  const goToNext = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 300;
  };

  useEffect(() => {
    getAll.perform();

    return () => getAll.cancel();
  }, []);
  const handleOnClick = () => {
    navigate("/createForm");
  };

  const selectEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="homePage">
      <div className="container">
        <div className="home-first-section">
          <img src={wedding} alt="wedding image" />
          <div className="content">
            <p className="title-app">
              {" "}
              Start your wedding plan with creating your invitation{" "}
            </p>
            <p className="paragraph-app">
              You need just seconds to create your wedding invitation. Komje.com
              event builder makes it super easy to create your short link, add
              all your rsvp questions, and get results for every question that
              you added. You can quickly add a photo and other important details
              about your wedding to your invitation.
            </p>
            <Button onClick={handleOnClick} label="Create invitation" />
          </div>
        </div>
      </div>

      {getAll.isLoading ? <Spinner /> : <></>}

      <div className="invitation-container">
        <div className="container">
          <div className="header-box">
            <h4 className=" invitation-header title-app">My Invitations</h4>
          </div>

          {events.length > 0 ? (
            <div className="slider-box">
              <MdChevronLeft
                className={"slider-icon"}
                onClick={goToPrevious}
                size={40}
              />
              <div className="cards-container" id="slider">
                {events.map((event) => (
                  <Card
                    {...event}
                    key={event._id}
                    onClick={() => {
                      selectEvent(event._id);
                    }}
                  />
                ))}
              </div>
              <MdChevronRight
                className={"slider-icon"}
                onClick={goToNext}
                size={40}
              />
            </div>
          ) : (
            <div className="cards-container" id="slider">
              <p className="error-msg">You did not create any invitation yet</p>
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <div className="home-first-section">
          <img src={komjeImg} alt="komjeImg" />
          <div className="content">
            <p className=" title-app">
              {" "}
              Your love isn`t ordinary and neither are our websites.
            </p>
            <p className="paragraph-app">
              Consider all the wedding details guests may text or call you to
              ask about, like food, beverage, dress code, and more. A custom
              wedding form lets you include everything your guest list may need
              to prepare for your wedding day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
