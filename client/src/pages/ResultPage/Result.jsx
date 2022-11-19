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
        <p>Guests number: {result.attending}</p>
        <p>Attending Percentage: {result.attendingPercentage}</p>
        <p>Responses in your event: {result.totalResponse}</p>
        <button className="guestList-btn" onClick={() => setShow(!show)}>
          Show List{" "}
        </button>
        <div>
          {show && (
            <div>
              <hr />
              <h3>Guests List </h3>
              <hr />
              <ul className="list-box">
                {result.guestsInformation?.map((guest) => {
                  return <li key={guest.guestName}>{guest.guestName}</li>;
                })}
              </ul>
            </div>
          )}
          <div className="food-reference-list">
            <h4>Food References</h4>
            {result.allTotalAnswers?.map((getResult) => {
              const diet = getResult.diet;

              return (
                <ul key={diet}>
                  <li key={diet.Vegan}>Vegan:{diet.Vegan ? diet.Vegan : 0}</li>
                  <li key={diet.Halal}>Halal:{diet.Halal ? diet.Halal : 0}</li>
                  <li key={diet.Vegetarian}>
                    Vegetarian:{diet.Vegetarian ? diet.Vegetarian : 0}
                  </li>
                  <li key={diet.Normal}>
                    Normal:{diet.Normal ? diet.Normal : 0}
                  </li>
                </ul>
              );
            })}
          </div>
          <div className="car-reference-list">
            {result.allTotalAnswers?.map((getResult) => {
              const car = getResult.car;

              return (
                <ul key={car}>
                  <li key={car.yes}>
                    Coming with car: {car.yes ? car.yes : 0}
                  </li>
                  <li key={car.no}>
                    Coming without car: {car.no ? car.no : 0}
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Result;
