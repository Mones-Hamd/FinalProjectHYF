import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEvent } from "../../hooks/useEvent";

const Home = () => {
  const { user } = useAuthContext();
  const { events, getAll } = useEvent();
  const navigate = useNavigate();

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
          <div className="home-image-first"></div>
          <button className="home-create-button" onClick={handleOnClick}>
            {" "}
            Create invitation{" "}
          </button>
        </div>
      </div>
      {getAll.isLoading && <div>loading...</div>}
      {events && (
        <div>
          {events.map((e, index) => (
            <div
              style={
                e.status === "ACTIVE"
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "gray" }
              }
              key={e._id}
              onClick={() => selectEvent(e._id)}
            >
              {index + 1} - {e.templateDetails.brideName}&
              {e.templateDetails.groomName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
