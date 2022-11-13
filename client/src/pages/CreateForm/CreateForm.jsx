import React, { useEffect, useState } from "react";
import "./createPage.css";
import { textInputsAttributes } from "./dataInform";
import InputWeddingForm from "../../components/InputWeddingForm/InputWeddingForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEvent } from "../../hooks/useEvent";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";

const CreateForm = () => {
  const { user } = useAuthContext();
  const { event, create, error, isLoading, isSuccess } = useEvent();
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [values, setValues] = useState({
    eventTitle: "",
    brideName: "",
    groomName: "",
    date: "",
    address: "",
    description: "",
    contactNumber: "",
    contactName: "",
  });
  const [userFile, setUserFile] = useState({
    file: [],
    filePreview: null,
  });

  useEffect(() => {
    return () => create.cancel();
  }, []);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageLoading = (e) => {
    const binaryData = [];
    const previewedImage = e.target.files[0];
    binaryData.push(previewedImage);

    if (previewedImage && previewedImage.size > 1e7) {
      toast.error("Oops! The size of image is larger than 10MB.");
      return (e.target.value = null);
    }

    setUserFile({
      ...userFile,
      file: previewedImage,
      filePreview: URL.createObjectURL(new Blob(binaryData)),
    });
  };

  const createEvent = async (e) => {
    e.preventDefault();
    const { ...rest } = values;

    const data = new FormData();
    data.append("file", userFile.file);
    data.append("upload_preset", "uploads");

    try {
      setIsImageUploading(true);

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqcwuzmai/image/upload",
        data
      );
      setIsImageUploading(false);

      const { url } = uploadRes.data;

      const requestBody = {
        isPrivate: false,
        type: "WEDDING",
        template: "DEFAULT",
        templateDetails: {
          ...rest,
          images: url,
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
    } catch (error) {
      setIsImageUploading(false);
      toast.error("Oops! Something went wrong. We cannot create your wedding.");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Oops! Something went wrong. We cannot create your wedding.");
    }
    if (isSuccess) {
      toast.success("You have created your wedding successfully!");
    }
  }, [error, isSuccess]);

  return (
    <>
      <ToastContainer />
      <div className="create-page">
        {(isLoading || isImageUploading) && <Spinner />}

        {user ? (
          <h1>This is {user.username} create page</h1>
        ) : (
          <p>
            Something went wrong ,Normally you should not be able to see this
            page
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
        <div className="create-form-container">
          <div className="create-form">
            <form className="" onSubmit={createEvent}>
              <h2 className="create-form-header">
                Create Your Special Invitation
              </h2>
              {textInputsAttributes.map((input) => (
                <InputWeddingForm
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <div className="form-line">
                <p className="create-form-tag-title">Image of Wedding</p>
                <label>
                  <input
                    name="file"
                    type="file"
                    className="create-form-input-photo"
                    onChange={handleImageLoading}
                    required
                    accept="image/png, image/gif, image/jpeg"
                  ></input>
                </label>
                {userFile.filePreview !== null ? (
                  <img
                    className="create-form-image-preview"
                    src={userFile.filePreview}
                    alt=""
                  />
                ) : null}
              </div>
              <div className="form-line">
                <label className="create-form-description-tag">
                  Description of Wedding
                </label>
                <textarea
                  type="text"
                  className="event-form-description"
                  placeholder="Write nice note for guests"
                  required
                  name="description"
                  rows="5"
                  cols="15"
                  value={values.name}
                  minLength="15"
                  maxLength="500"
                  onChange={onChange}
                ></textarea>
                <button className="create-form-submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
