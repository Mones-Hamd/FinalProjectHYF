import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEvent } from "../../hooks/useEvent";
import wedding from "../../Image/wedding-theme.gif";
import Card from "../../components/HomaPage/Card/Card";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Home = () => {
  const { user } = useAuthContext();
  const { events, getAll } = useEvent();
  const navigate = useNavigate();

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
      {user ? (
        <h1> Start your wedding plan with creating your invitation </h1>
      ) : (
        <p>
          Something went wrong ,Normally you should not be able to see this page
        </p>
      )}
      <div className="home-first-section">
        <div className="home-first-container">
          <div className="home-image-first">
            <img src={wedding} alt="wedding image" />
          </div>

          <button className="home-create-button" onClick={handleOnClick}>
            {" "}
            Create invitation{" "}
          </button>
        </div>
      </div>
      {getAll.isLoading && <div>loading...</div>}

      <div className="invitation-container">
        <div className="header-box">
          <h2 className="invitation-header">My Invitations</h2>
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
                <>
                  <Card
                    {...event}
                    key={event._id}
                    onClick={() => {
                      selectEvent(event._id);
                    }}
                  />
                </>
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
            <p className="error-msg">You did not create any invitation yet </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
