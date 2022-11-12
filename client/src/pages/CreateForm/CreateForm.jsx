import React, { useEffect } from "react";
import "./createPage.css";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useEvent } from "../../hooks/useEvent";

const CreateForm = () => {
  const { user } = useAuthContext();
  const { event, create } = useEvent();

  useEffect(() => {
    return () => create.cancel();
  }, []);

  const createEvent = () => {
    const requestBody = {
      isPrivate: false,
      type: "WEDDING",
      template: "DEFAULT",
      templateDetails: {
        eventTitle: "Our Wedding",
        brideName: "Camelia",
        groomName: "Oliver",
        date: "2022-09-09T13:00:00",
        address: "somewhere",
        description: "wedding description",
        contactNumber: "",
        contactName: "C. Ronaldo",
        images: [
          {
            url: "http://localhost:1234/images/unique-image-name",
            alt: "wedding image",
          },
        ],
      },
      form: [
        {
          key: "fullName",
          label: "Please enter your full name?",
          attributes: {
            type: "text",
            required: true,
          },
        },
        {
          key: "email",
          label: "Enter your email?",
          attributes: {
            type: "email",
            required: true,
          },
        },
        {
          key: "response",
          label: "Are you going to join us?",
          attributes: {
            type: "singleChoice",
            required: true,
          },
          options: [
            {
              key: "1",
              value: "yes",
            },
            {
              key: "2",
              value: "no",
            },
          ],
        },
        {
          key: "numberOfPeople",
          label: "How many people are you coming with?",
          attributes: {
            type: "number",
            required: true,
            max: 5,
            min: 0,
          },
        },
        {
          key: "diet",
          label: "Please select your diet",
          attributes: {
            type: "singleChoice",
            required: false,
          },
          options: [
            {
              key: "1",
              value: "Vegetarian",
            },
            {
              key: "2",
              value: "Vegan",
            },
            {
              key: "3",
              value: "Halal",
            },
            {
              key: "4",
              value: "Normal",
            },
          ],
        },
        {
          key: "car",
          label: "Will you come with your own car?",
          attributes: {
            type: "singleChoice",
            required: false,
          },
          options: [
            {
              key: "1",
              value: "yes",
            },
            {
              key: "2",
              value: "no",
            },
          ],
        },
      ],
    };
    create.perform(requestBody);
  };

  return (
    <div className="create-page">
      {user ? (
        <h1>This is {user.username} create page</h1>
      ) : (
        <p>
          Something went wrong ,Normally you should not be able to see this page
        </p>
      )}
      {event && (
        <>
          <div>
            {event.templateDetails.brideName} &{" "}
            {event.templateDetails.groomName}
          </div>
          <div>{event.templateDetails.date}</div>
          <div>created by {event.creatorName}</div>
          <div>url: {event.url}</div>
        </>
      )}
      <button type="button" onClick={createEvent}>
        Create
      </button>
    </div>
  );
};

export default CreateForm;
