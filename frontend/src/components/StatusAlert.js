import React from "react";

import "./StatusAlert.css";


const StatusAlert = ({title,description}) => {
  return (
    <div className="alertbox">
      <div className="col-12">
        <span className="alettx01">{title}</span>
      </div>
      <div className="col-12">
        <span className="alettx02">{description}</span>
      </div>
    </div>
  );
};

export default StatusAlert;
