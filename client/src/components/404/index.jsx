import React from "react";
import pageNotFound from "../../assets/404.png";
import "./style.css";

const notFound = (props) => {
  return <img src={pageNotFound} alt="404" className="notFound" />
};

export default notFound;
