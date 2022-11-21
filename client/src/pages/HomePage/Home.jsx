import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useEvent } from "../../hooks/useEvent";
import Card from "../../components/HomaPage/Card/Card";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Spinner from "../../components/Spinner/Spinner";

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
            <p> Start your wedding plan with creating your invitation </p>
            <button className="home-create-button" onClick={handleOnClick}>
              Create invitation
            </button>
          </div>
        </div>
      </div>

      {getAll.isLoading ? <Spinner /> : <></>}

      <div className="invitation-container">
        <div className="container">
          <div className="header-box">
            <h4 className="invitation-header">My Invitations</h4>
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
    </div>
  );
};

export default Home;
