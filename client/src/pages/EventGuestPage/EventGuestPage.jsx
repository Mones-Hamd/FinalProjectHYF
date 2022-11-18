import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import { useEvent } from "../../hooks/useEvent";
import useFetch from "../../hooks/useFetch";
import "./EventGuestPage.css";

function EventGuestPage() {
  const { event, getOneEvent } = useEvent();
  const [formValues, setFormValues] = useState();

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const onReceived = () => {
    navigate("/");
  };

  const POST_RESPONSE_ROUTE = "/response/";
  const { /* isLoading, error, */ performFetch /* cancelFetch */ } = useFetch(
    POST_RESPONSE_ROUTE,
    onReceived
  );

  const submit = async (e) => {
    e.preventDefault();

    const requestBody = {
      eventId: event._id,
      guestName: "",
      guestEmail: "",
      responses: Object.entries(formValues).map(([question, answer]) => {
        return {
          question,
          answer,
        };
      }),
    };

    requestBody.guestName = requestBody.responses.find(
      (item) => item.question === "fullName"
    ).answer;
    requestBody.guestEmail = requestBody.responses.find(
      (item) => item.question === "email"
    ).answer;

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };
    performFetch(options);
    //console.log("success", JSON.stringify(requestBody));
  };

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
      <div className="form">{getEventForm(event?.form, onChange, submit)}</div>
    </>
  );
}

export default EventGuestPage;

const getEventForm = (form, onChange, submit) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <form onSubmit={submit}>
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
                  name={question.key}
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
                  name={question.key}
                  placeholder="email"
                  onChange={onChange}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                ></input>
              )}
              {question.attributes.type === "number" && (
                <input
                  type="number"
                  name={question.key}
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
                        name={question.key}
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
                        name={question.key}
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
