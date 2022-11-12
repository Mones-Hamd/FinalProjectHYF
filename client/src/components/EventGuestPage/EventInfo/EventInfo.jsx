import React from "react";
import "./EventInfo.css";
const templateDetails = {
  eventTitle: "Our Wedding",
  brideName: "Camelia",
  groomName: "Oliver",
  date: "2022-09-09T13:00:00",
  address: "Amsterdam",
  description: "wedding description",
  contactName: "John",
  contactNumber: "+305221235151",
};
const EventInfo = () => {
  return (
    <div className="eventInfoBox">
      {Object.entries(templateDetails).map(([value]) => (
        <>
          <p>{value}</p>
        </>
      ))}
    </div>
  );
};

export default EventInfo;
