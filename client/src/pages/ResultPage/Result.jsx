import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./result.css";
import { useResult } from "../../hooks/useResult";

const Result = () => {
  const [show, setShow] = useState(false);

  const { result, getResult } = useResult();

  useEffect(() => {
    getResult.perform();
    return () => getResult.cancel();
  }, []);

  return (
    <div className="containerResult">
      <div className="guests-count-box">
        <h4>Total result</h4>
        <p>Total guests number: {result.attending}</p>
        <p>Attending Percentage: {result.attendingPercentage}</p>
        <p>Total responses in your event: {result.totalResponse}</p>
        <button className="guestList-btn" onClick={() => setShow(true)}>
          Guests List{" "}
        </button>
        <div>
          {show && (
            <div>
              <hr />
              <h3>Showing list </h3>
              <hr />
              <ul className="list-box">
                {result.guestsInformation?.map((guest) => {
                  return <li key={guest.guestName}>{guest.guestName}</li>;
                })}
              </ul>
              <button
                className="exit"
                type="button"
                onClick={() => setShow(false)}
              >
                X
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Result;
