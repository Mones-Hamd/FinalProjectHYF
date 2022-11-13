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

  const selectEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="homePage">
      {user ? (
        <h1>This is {user.username} home page</h1>
      ) : (
        <p>
          Something went wrong ,Normally you should not be able to see this page
        </p>
      )}
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
              <div>{e.templateDetails.date}</div>
              <div>created by {e.creatorName}</div>
              <div>url: {e.url}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
