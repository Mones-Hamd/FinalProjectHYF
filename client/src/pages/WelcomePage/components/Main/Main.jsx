import React from "react";
import background from "../../Images/background.jpg";
import "../Main/Main.css";

const Main = () => {
  return (
    <div className="main">
      <img className="imagePhoto" alt="" src={background} />
    </div>
  );
};

export default Main;
