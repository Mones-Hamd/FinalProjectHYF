import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEvent } from "../../hooks/useEvent";
import SecondaryNav from "../../components/SecondaryNav/SecondaryNav";
import wedding from "../../Image/wedding-theme.gif";

const Home = () => {
  const { user } = useAuthContext();
  const { events, getAll } = useEvent();
  const [value, setValue] = useState("wedding");
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
        <SecondaryNav setValue={setValue} />
      ) : (
        <p>
          Something went wrong ,Normally you should not be able to see this page
        </p>
      )}
      <div className="home-first-section">
        {value === "wedding" ? (
          <div className="home-first-container">
            <div className="home-image-first">
              <img src={wedding} alt="wedding image" />
            </div>

            <button className="button" onClick={handleOnClick}>
              {" "}
              Create invitation{" "}
            </button>
          </div>
        ) : (
          <div>
            <h1>{value} event is coming soon ....</h1>
          </div>
        )}
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
