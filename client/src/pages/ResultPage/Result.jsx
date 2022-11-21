import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./result.css";
import { useResult } from "../../hooks/useResult";
import BarChart from "../../components/BarChart/BarChart";
import PieChart from "../../components/PieChart/PieChart";
import Spinner from "../../components/Spinner/Spinner";

const Result = () => {
  const [show, setShow] = useState(false);
  const { getResult, result } = useResult();

  useEffect(() => {
    getResult.perform();
  }, []);
  const pieLable = ["Attending"];

  return (
    <>
      {getResult.isLoading && <Spinner />}
      <div className="containerResult">
        <div className="guests-count-box">
          <h4>Total result</h4>
          <p>Guests number: {result?.attending}</p>
          <p>Attending Percentage: {result?.attendingPercentage}% </p>
          <p>Responses in your event: {result?.totalResponse}</p>
        </div>
        <div className="result-chart-component">
          <PieChart
            text="Attending chart"
            labels={pieLable}
            numberOfAttending={result?.totalResponse}
            data={[result?.attending, result?.notAttending]}
          />
        </div>
        <button className="guestList-btn" onClick={() => setShow(!show)}>
          Show List
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
        </div>
        {result?.chartArray?.map((chart, indx) => (
          <div className="result-chart-component" key={indx}>
            <BarChart
              text={result.subjectArray[indx]}
              labels={chart.labels}
              numberOfAttending={result.attending}
              data={chart.data}
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default Result;
