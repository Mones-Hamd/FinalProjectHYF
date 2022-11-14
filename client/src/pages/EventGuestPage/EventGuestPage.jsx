import React, { useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import { useEvent } from "../../hooks/useEvent";
import "./EventGuestPage.css";

function EventGuestPage() {
  const { event, getOneEvent } = useEvent();
  useEffect(() => {
    getOneEvent.perform();

    return () => getOneEvent.cancel();
  }, []);

  const getEventDetails = () => {
    if (event) {
      if (event.type === "WEDDING") {
        if (event.template === "DEFAULT") {
          return getWeddingDefault(event.templateDetails);
        }
      }
    }
  };
  return (
    <>
      <Carousel images={event?.templateDetails?.images} />
      {getEventDetails()}
      <div className="form">{getEventForm(event?.form)}</div>
    </>
  );
}

export default EventGuestPage;

const getEventForm = (form) => {
  return (
    <form>
      {form?.map((question, index) => {
        return (
          <div key={question.key} className="question">
            <div>
              {index + 1} - {question.label}{" "}
              {question.attributes.required && (
                <span className="required">(required)</span>
              )}
            </div>
            <div>
              {question.attributes.type === "text" && (
                <input type="text" placeholder="free text"></input>
              )}
              {question.attributes.type === "email" && (
                <input type="email" placeholder="email"></input>
              )}
              {question.attributes.type === "number" && (
                <input
                  type="number"
                  placeholder="number"
                  min={question.attributes.min}
                  max={question.attributes.max}
                ></input>
              )}
              {question.attributes.type === "singleChoice" &&
                question.options.map((option) => {
                  return (
                    <div key={option.key} className="option">
                      <input
                        type="radio"
                        value={option.value}
                        name={question.label}
                      />{" "}
                      {option.value}
                    </div>
                  );
                })}
              {question.attributes.type === "multipleChoice" &&
                question.options.map((option) => {
                  return (
                    <div key={option.key} className="option">
                      <input
                        type="radio"
                        value={option.value}
                        name={question.label}
                      />{" "}
                      {option.value}
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
      <button>Submit</button>
    </form>
  );
};

const getWeddingDefault = (details) => {
  const weddingDate = new Date(details.date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="weddingDefault">
      <div className="item">
        <span className="title">Title:</span> {details.eventTitle}
      </div>
      <div className="item">
        <span className="title">Bride and Groom:</span> {details.brideName}&
        {details.groomName}
      </div>
      <div className="item">
        <span className="title">Date:</span> {weddingDate}
      </div>
      <div className="item">
        <span className="title">Address:</span> {details.address}
      </div>
      <div className="item">
        <span className="title">Contact:</span> {details.contactNumber} -{" "}
        {details.contactName}
      </div>
      <div className="item">
        <span className="title">PS:</span> {details.description}
      </div>
    </div>
  );
};
