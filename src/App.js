import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

import Legend from "./components/Legend";
import Spinner from "./components/Spinner";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );
        setEarthquakes(res.data.features);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getColor = (mag) => {
    if (mag < 2) return "green";
    if (mag < 4) return "orange";
    return "red";
  };

  const getRadius = (mag) => (mag ? mag * 4 : 4);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Earthquake Visualizer</h2>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {earthquakes.map((eq) => {
          const [lng, lat] = eq.geometry.coordinates;
          const mag = eq.properties.mag;
          const place = eq.properties.place;
          const time = new Date(eq.properties.time).toLocaleString();

          return (
            <CircleMarker
              key={eq.id}
              center={[lat, lng]}
              radius={getRadius(mag)}
              color={getColor(mag)}
              fillOpacity={0.6}
            >
              <Popup>
                <strong>Location:</strong> {place} <br />
                <strong>Magnitude:</strong> {mag} <br />
                <strong>Time:</strong> {time}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <Legend />
    </div>
  );
}

export default App;
