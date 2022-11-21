import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvent } from "../../hooks/useEvent";
import { useCancelEvent } from "../../hooks/useCancelEvent";
import { baseUrl } from "../../config/config";
import Carousel from "../../components/Carousel/Carousel";
import "./eventPage.css";
import Accordion from "../../components/Accordion/Accordion";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import { useResult } from "../../hooks/useResult";

const EventPage = () => {
  const { events } = useEvent();
  const { getResult } = useResult();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { isLoading, isSuccess, cancelEvent, cancelFetch } =
    useCancelEvent(eventId);
  const event = events.find((event) => event._id === eventId);

  const generateUrl = () => {
    if (event?.shortLink) {
      return `${baseUrl}/to/${event.shortLink}`;
    }
  };

  useEffect(() => {
    return () => cancelFetch();
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

  const showResults = () => {
    getResult.perform;

    if (!getResult.isLoading) navigate(`/result/${event._id}`);
  };
  const copyLink = async () => {
    await navigator.clipboard.writeText(generateUrl());
    toast.info("Copied", {
      autoClose: 2000,
      hideProgressBar: true,
      isLoading: false,
      closeButton: false,
      icon: false,
      bodyStyle: {
        backgroundColor: "#000000ff",
        width: "100%",
      },
    });
  };

  return (
    <>
      {(isLoading || isSuccess) && <Spinner />}
      <Carousel images={event?.templateDetails?.images} />
      <div className="details">
        <Accordion title="Details">{getEventDetails()}</Accordion>
      </div>
      <div className="form">
        <Accordion title="Form">{getEventForm(event?.form)}</Accordion>
      </div>
      <div className="buttonGroup">
        <button type="button" disabled={isLoading} onClick={showResults}>
          Show Results
        </button>
        <button type="button" disabled={isLoading} onClick={cancelEvent}>
          Cancel Event
        </button>
      </div>
      <div className="copyLinkGroup" onClick={copyLink}>
        <input type="text" disabled value={generateUrl()}></input>
        <button type="button" disabled={isLoading}>
          Copy Link
        </button>
      </div>
    </>
  );
};

export default EventPage;

const getEventForm = (form) => {
  return (
    <div>
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
                <input type="text" disabled placeholder="free text"></input>
              )}
              {question.attributes.type === "email" && (
                <input type="email" disabled placeholder="email"></input>
              )}
              {question.attributes.type === "number" && (
                <input type="number" disabled placeholder="number"></input>
              )}
              {question.attributes.type === "singleChoice" &&
                question.options.map((option) => {
                  return (
                    <div key={option.key} className="option">
                      <input
                        type="radio"
                        value={option.value}
                        name={option.key}
                        disabled
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
                        type="checkbox"
                        value={option.value}
                        name={option.key}
                        disabled
                      />{" "}
                      {option.value}
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const getWeddingDefault = (details) => {
  const weddingDate = new Date(details.date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
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
