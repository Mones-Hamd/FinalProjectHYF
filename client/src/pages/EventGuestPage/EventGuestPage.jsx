import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import EventGuestForm from "../../components/EventGuestPage/EventGuestForm/EventGuestForm";
import EventInfo from "../../components/EventGuestPage/EventInfo/EventInfo";
import Spinner from "../../components/Spinner/Spinner";
import { useEvent } from "../../hooks/useEvent";
import useFetch from "../../hooks/useFetch";
import "./EventGuestPage.css";

function EventGuestPage() {
  const { event, getOneEvent } = useEvent();
  const [formValues, setFormValues] = useState();
  useEffect(() => {
    getOneEvent.perform();

    return () => getOneEvent.cancel();
  }, []);

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const onReceived = () => {
    navigate("/");
  };
  const POST_RESPONSE_ROUTE = "/response/";
  const { isLoading, /* error ,*/ performFetch /* cancelFetch */ } = useFetch(
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

  return (
    <>
      <Carousel className="picture" images={event?.templateDetails?.images} />
      <div className="eventContainer">
        <EventInfo {...event?.templateDetails} />

        <EventGuestForm
          formProps={event?.form}
          onChange={onChange}
          onSubmit={submit}
        />

        {isLoading ? <Spinner /> : <></>}
      </div>
    </>
  );
}

export default EventGuestPage;
