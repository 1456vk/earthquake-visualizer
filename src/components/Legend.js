import React from "react";
import "./Legend.css";

function Legend() {
  return (
    <div className="legend">
      <h4>Magnitude Legend</h4>
      <div><span style={{ background: "yellow" }}></span> Magnitude ≤ 3</div>
      <div><span style={{ background: "orange" }}></span> Magnitude 3 - 5</div>
      <div><span style={{ background: "red" }}></span> Magnitude > 5</div>
    </div>
  );
}

export default Legend;
