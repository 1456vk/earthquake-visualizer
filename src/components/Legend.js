import React from "react";
import "./Legend.css";

const Legend = () => {
  return (
    <div className="legend">
      <h4>Magnitude</h4>
      <div>
        <span className="legend-color green"></span> 0-1.9
      </div>
      <div>
        <span className="legend-color orange"></span> 2-3.9
      </div>
      <div>
        <span className="legend-color red"></span> 4+
      </div>
    </div>
  );
};

export default Legend;
