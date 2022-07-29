import React from "react";
import GifLoader from "../../assets/img/loader_.gif";
import "./loading.scss";
function Loading() {
  return (
    <div className="gifloader">
      <img src={GifLoader} className={"img-fluid"} alt="Error!!!" />
    </div>
  );
}

export default Loading;
