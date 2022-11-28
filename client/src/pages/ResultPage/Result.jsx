import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./result.css";
import { useResult } from "../../hooks/useResult";
import BarChart from "../../components/BarChart/BarChart";
import PieChart from "../../components/PieChart/PieChart";
import Spinner from "../../components/Spinner/Spinner";
import { ResultContext } from "../../contexts/ResultContext";

const Result = () => {
  const [show, setShow] = useState(false);

  const { getResult } = useResult();
  const { result } = useContext(ResultContext);
  useEffect(() => {
    getResult.perform();

    return () => {
      getResult.cancel();
    };
  }, []);

  const pieLable = ["Attending"];

  return (
    <>
      {getResult.isLoading && <Spinner />}

      <div className="containerResult">
        <div className="guests-count-box">
          <h1>Total result</h1>
          <hr />
          <p className="paragraph-app">
            Guests number: {result?.attending || 0}
          </p>
          <p className="paragraph-app">
            Responses in your event: {result?.totalResponse || 0}
          </p>
          <p className="paragraph-app">
            Attending Percentage: {result?.attendingPercentage || 0}%{" "}
          </p>
        </div>
        <button
          className="guestList-btn btn-app"
          onClick={() => setShow(!show)}
        >
          Show List
        </button>
        <div>
          {show && (
            <div className="lists-box">
              <h1>Guests List </h1>
              <hr />
              <ul className="list-box">
                {result.guestsInformation?.map((guest) => {
                  return (
                    <li className="paragraph-app" key={guest.guestName}>
                      {guest.guestName}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        {result ? (
          <>
            <div className="result-chart-component">
              <PieChart
                text="Attending chart"
                labels={pieLable}
                numberOfAttending={result?.totalResponse}
                data={[result?.attending, result?.notAttending]}
              />
            </div>

            <div
              className={
                result?.chartArray.length > 3 ? "flex-bar-chart-section" : null
              }
            >
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
        ) : (
          <div>
            <p className="no-result-msg">
              <span className="sorry-span">Sorry !.. </span>
              <br></br>It seems that no one has answered your invitation yet.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default Result;
