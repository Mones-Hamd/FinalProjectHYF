import React, { useEffect, useState } from "react";
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
      <p>EventID :{event?._id}</p>
      <Carousel images={event?.templateDetails?.images} />
      {getEventDetails()}
      <div className="form">{getEventForm(event?.form)}</div>
    </>
  );
}

export default EventGuestPage;

const getEventForm = (form) => {
  const [focused, setFocused] = useState(false);
  const [values, setValues] = useState({
    eventId: "",
    guestName: "",
    guestEmail: "",
    response: [
      {
        question: {
          questionKey: {},
          questionText: "",
        },
        answer: {
          answerKey: "",
          answerText: "",
        },
      },
    ],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
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
                <input
                  type="text"
                  name={question.label}
                  placeholder="free text"
                  onChange={onChange}
                  onBlur={handleFocus}
                  onFocus={handleFocus}
                  focused={focused.toString()}
                ></input>
              )}
              {question.attributes.type === "email" && (
                <input
                  type="email"
                  name={question.label}
                  placeholder="email"
                  onChange={onChange}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                ></input>
              )}
              {question.attributes.type === "number" && (
                <input
                  type="number"
                  name={question.label}
                  placeholder="number"
                  min={question.attributes.min}
                  max={question.attributes.max}
                  onChange={onChange}
                  onBlur={handleFocus}
                  focused={focused.toString()}
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
                        onChange={onChange}
                        focused={focused.toString()}
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
                        onChange={onChange}
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
