import React from "react";

const Legend = () => {
  const grades = [0, 1, 2, 3, 4, 5];
  const colors = ["#1a9850","#91cf60","#d9ef8b","#fee08b","#fc8d59","#d73027"];

  return (
    <div style={{ background: "#fff", padding: "10px", width: "150px", margin: "20px auto", borderRadius: "5px" }}>
      <h4>Magnitude</h4>
      {grades.map((grade, idx) => (
        <div key={idx}>
          <i style={{ background: colors[idx], width: "20px", height: "20px", display: "inline-block", marginRight: "5px" }}></i>
          {grade}+
        </div>
      ))}
    </div>
  );
};

export default Legend;
