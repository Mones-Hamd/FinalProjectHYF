import React from "react";
import "./Loading.css";
import loading from "../../Image/loading.gif";

const Loading = () => {
  return (
    <div className="loadingImg">
      <div className="ImgDiv">
        <img src={loading} alt="on loading process" />
      </div>
    </div>
  );
};

export default Loading;
