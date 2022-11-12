import React from "react";
import EventGuestForm from "../../components/EventGuestPage/EventGuestForm/EventGuestForm";
import EventInfo from "../../components/EventGuestPage/EventInfo/EventInfo";
import "./EventGuestPage.css";

function EventGuestPage() {
  return (
    <div className="guestEventContainer">
      <EventInfo />
      <EventGuestForm />
    </div>
  );
}

export default EventGuestPage;
