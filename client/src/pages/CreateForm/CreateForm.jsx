import React from "react";
import "./createPage.css";

import { useAuthContext } from "../../hooks/useAuthContext";

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
