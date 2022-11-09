import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./createPage.css";

const CreateForm = () => {
  const { user } = useAuthContext();
  return (
    <div className="create-page">
      {user ? (
        <h1>This is {user.username} create page</h1>
      ) : (
        <p>
          Something went wrong ,Normally you should not be able to see this page
        </p>
      )}
    </div>
  );
};

export default CreateForm;
