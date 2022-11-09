import React from "react";
import "./home.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
  return (
    <div className="homePage">
      {user ? (
        <h1>This is {user.username} home page</h1>
      ) : (
        <p>
          Something went wrong ,Normally you should not be able to see this page
        </p>
      )}
      ;
    </div>
  );
};

export default Home;
